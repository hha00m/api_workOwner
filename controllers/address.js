const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Address = require('../models/address');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.addressById = (req, res, next, id) => {
  Address.findById(id).exec((err, address) => {
    if (err || !address) {
      return res.status(400).json({
        error: 'address not found',
      });
    }
    console.log('address found ...');
    req.address = address;
    next();
  });
};

exports.read = (req, res) => {
   return res.json(req.address);
};

exports.create = (req, res) => {
   console.log(req.body.city);
  const address = new Address(req.body);
  address.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};
exports.remove = (req, res) => {
  // console.log('--------------');
  let address = req.address;
  address.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'address deleted successfully',
    });
  });
};
exports.update = (req, res) => {
  const address = req.address;
  address.town = req.body.town;
  address.address = req.body.address;
  address.city = req.body.city;
  address.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    // console.log(data);
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
   // console.log(e);
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

  let pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  let current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0
  const total = Address.find(query).count;
  // Town.aggregate(
  //   [
  //       {
  //           "$project" : {
  //               // "_id" : NumberInt(0),
  //               "towns" : "$$ROOT"
  //           }
  //       },
  //       {
  //           "$lookup" : {
  //               "localField" : "towns.city",
  //               "from" : "cities",
  //               "foreignField" : "_id",
  //               "as" : "cities"
  //           }
  //       },
  //       {
  //         "$match": {"cities.name" : { $regex: '.*' + fCity + '.*' }}
  //       }

  //   ])

  Address.find(query)
    .populate({
      path: 'city',
      match: { name: { $regex: '.*' + fCity + '.*' } },
    })
    .populate('town')
    .populate('branch')
    .populate('jobTitle')
    .sort([[sorter, order]])
    .skip(current * pageSize)
    .limit(pageSize)
    .exec((err, addresses) => {
      if (err) {
        return res.status(400).json({
          error: 'addresses not found',
        });
      }

      res.json({
        data: addresses,
        total,
        success: true,
        pageSize,
        current,
      });
    });
};

