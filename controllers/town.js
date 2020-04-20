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
    console.log('town found ...');
    req.town = town;
    next();
  });
};

exports.read = (req, res) => {
  req.town.photo = undefined;
  return res.json(req.town);
};

exports.create = (req, res) => {
  //console.log("name is:",req.body.name," city is:", req.body.city,"    :",req.body.center,"     :",req.body.note)

  const town = new Town(req.body);
  town.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};
exports.remove = (req, res) => {
  console.log('--------------');
  let town = req.town;
  town.remove((err, data) => {
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
  town.center = req.body.center;
  town.note = req.body.note;
  town.city = req.body.city;
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
  let str;
  let sorter = '_id';
  let order = 1;
  try {
    let str = sort.split('_');
    sorter = str[0] ? str[0] : '_id';
    order = str[1] == 'ascend' ? 1 : -1;
  } catch (e) {
    console.log(e);
  }
  //-----------------------find Item---------------------------
  var fName = req.query.name ? req.query.name : '',
    fCity = req.query.city ? req.query.city : '';
  fCenter = req.query.center ? req.query.center : '';

  //------------------------------------------------------
  var query = {};
  if (fName != '' || fCenter != '') query['$and'] = [];
  if (fName !== '') {
    query['$and'].push({ name: { $regex: '.*' + fName + '.*' } });
  }
  if (fCenter !== '') {
    query['$and'].push({ center: { $regex: '.*' + fName + '.*' } });
  }
  if (fCenter !== '') {
    query['$and'].push({ center: fCenter });
  }

  let pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  let current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0
  const total = Town.find(query).count;
  Town.find(query)
    .populate({
      path: 'city',
      match: { name: { $regex: '.*' + fCity + '.*' } },
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
