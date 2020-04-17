const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Town = require('../models/town');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.townById = (req, res, next, id) => {
  Town.findById(id).exec((err, town) => {
    if (err || !town) {
      return res.status(400).json({
        error: 'town not found',
      });
    }
    req.town = town;
    next();
  });
};

exports.read = (req, res) => {
  req.town.photo = undefined;
  return res.json(req.town);
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      });
    }
    // check for all fields
    const { name, city, center } = fields;
    if (!name || !city) {
      return res.status(400).json({
        error: 'All fields are required',
      });
    }

    let town = new Town(fields);

    town.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.remove = (req, res) => {
  let town = req.town;
  town.remove((err, deletedTown) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'town deleted successfully',
    });
  });
};
exports.update = (req, res) => {
  const town = req.town;
  town.name = req.body.name;
  town.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

/**
 *  /api/towns?current=1&pageSize=20&sorter=
 *
 *
    let order = req.query.order ? req.query.order : "asc";
 * let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
 * let limit = req.query.limit ? parseInt(req.query.limit) : 6;
 */

exports.list = (req, res) => {
  //---------------------sort live--------------------------
  let sort = req.query.sorter;
  try{
  let str = sort.split('_');
  }catch(e){
   console.log(e);
  }
  let sorter = str[0] ? str[0] : '_id';
  let order = str[1] == 'ascend' ? 1 : -1;
  //-----------------------find Item---------------------------
  var fName = req.query.name ? req.query.name : '',
    fCity = req.query.city ? req.query.city : '';
  fCenter = req.query.center ? req.query.center : '';

  //------------------------------------------------------
  var query = {};
  if (fName != '' || fCenter != '') query = { $and: [] };
  if (fName !== '') {
    query.$and.push({ name: { $regex: '.*' + fName + '.*' } });
  }
  if (fCenter !== '') {
    query.$and.push({ center: { $regex: '.*' + fName + '.*' } });
  }
 if (fCenter !== '') {
   query.$and.push({ center: fCenter });
 }

  //------------------------------------------------------
  // var queryCity = {};
  // if (fCity != '') queryCity = { match: [] };

  // if (fCity !== '') {
  //   queryCity.$and.push({ name: { $regex: '.*' + fCity + '.*' } });
  // }

  //--------------------------------------------------
  let pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  let current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0
  const total=Town.find(query).count;
  Town.find(query)
    .populate({
      path: 'city',
      match:{ name: { $regex: '.*' + fCity + '.*' }},
    })
    .sort([[sorter, order]])
    .skip(current * pageSize)
    .limit(pageSize)
    .exec((err, towns) => {
      if (err) {
        return res.status(400).json({
          error: 'towns not found',
        });
      }

      res.json({
        data: towns,
        total,
        success: true,
        pageSize,
        current,
      });
    });
};
