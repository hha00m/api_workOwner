const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Client = require('../models/client');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.clientById = (req, res, next, id) => {
  Client.findById(id).exec((err, client) => {
    if (err || !client) {
      return res.status(400).json({
        error: 'client not found',
      });
    }
    console.log('client found ...');
    req.client = client;
    next();
  });
};



exports.create = (req, res) => {
  //console.log("name is:",req.body.name," city is:", req.body.city,"    :",req.body.center,"     :",req.body.note)

  const client = new Client(req.body);
  client.save((err, data) => {
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
  let client = req.client;
  client.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'client deleted successfully',
    });
  });
};
exports.update = (req, res) => {
  const client = req.client;
  client.name = req.body.name;
  client.mobile = req.body.mobile;
  client.note = req.body.note;
  client.branch = req.body.branch;
  client.save((err, data) => {
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
  const total = Client.find(query).count;
  Client.find(query)
    .populate({
      path: 'Branch',
      match: { name: { $regex: '.*' + fCity + '.*' } },
    })
    .sort([[sorter, order]])
    .skip(current * pageSize)
    .limit(pageSize)
    .exec((err, clients) => {
      if (err) {
        return res.status(400).json({
          error: 'clients not found',
        });
      }

      res.json({
        data: clients,
        total,
        success: true,
        pageSize,
        current,
      });
    });
};
