const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Store = require('../models/store');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.storeById = (req, res, next, id) => {
  Store.findById(id).exec((err, store) => {
    if (err || !store) {
      return res.status(400).json({
        error: 'store not found',
      });
    }
    console.log('store found ...');
    req.store = store;
    next();
  });
};



exports.create = (req, res) => {
  //console.log("name is:",req.body.name," city is:", req.body.city,"    :",req.body.center,"     :",req.body.note)

  const store = new Store(req.body);
  store.save((err, data) => {
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
  let store = req.store;
  store.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'store deleted successfully',
    });
  });
};
exports.update = (req, res) => {
  const store = req.store;
  store.name = req.body.name;
  store.mobile = req.body.mobile;
  store.note = req.body.note;
  store.client = req.body.client;
  store.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

/**
 *  /api/clients?current=1&pageSize=20&sorter=
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
    console.log("error in the background list ");
  }
  //-----------------------find Item---------------------------
  var fName = req.query.name ? req.query.name : '',
    fCity = req.query.branch ? req.query.branch : '';
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
  const total = Store.find(query).count;
  Store.find(query)
    .populate({
      path: 'Client',
      match: { name: { $regex: '.*' + fCity + '.*' } },
    })
    .sort([[sorter, order]])
    .skip(current * pageSize)
    .limit(pageSize)
    .exec((err, stores) => {
      if (err) {
        return res.status(400).json({
          error: 'stores not found',
        });
      }

      res.json({
        data: stores,
        total,
        success: true,
        pageSize,
        current,
      });
    });
};
