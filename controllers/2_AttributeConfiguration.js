const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const AttributeConfiguration = require('../models/2_AttributeConfiguration');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.attributeConfigurationById = (req, res, next, id) => {
  AttributeConfiguration.findById(id).exec((err, attributeConfiguration) => {
    if (err || !attributeConfiguration) {
      return res.status(400).json({
        error: 'attributeConfiguration not found',
      });
    }
    console.log('attributeConfiguration found ...');
    req.attributeConfiguration = attributeConfiguration;
    next();
  });
};

exports.read = (req, res) => {
  req.attributeConfiguration.photo = undefined;
  return res.json(req.attributeConfiguration);
};

exports.create = (req, res) => {
  //console.log("name is:",req.body.name," city is:", req.body.city,"    :",req.body.center,"     :",req.body.note)

  const attributeConfiguration = new AttributeConfiguration(req.body);
  attributeConfiguration.save((err, data) => {
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
  let attributeConfiguration = req.attributeConfiguration;
  attributeConfiguration.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'attributeConfiguration deleted successfully',
    });
  });
};
exports.update = (req, res) => {
  const attributeConfiguration = req.attributeConfiguration;
  attributeConfiguration.name = req.body.name;
  attributeConfiguration.attributeName = req.body.attributeName;
  attributeConfiguration.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

/**
 *  /api/attributeConfigurations?current=1&pageSize=20&sorter=
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
    fCity = req.query.attributeName ? req.query.attributeName : '';

  //------------------------------------------------------
  var query = {};
  if (fName != ''  ) query['$and'] = [];
  if (fName !== '') {
    query['$and'].push({ name: { $regex: '.*' + fName + '.*' } });
  }
  if (fName !== '') {
    query['$and'].push({ center: { $regex: '.*' + fName + '.*' } });
  }


  let pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  let current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0
  const total = AttributeConfiguration.find(query).count;


  AttributeConfiguration.find(query)
    .populate({
      path: 'attributeName',
      match: { name: { $regex: '.*' + fCity + '.*' } },
    })
    // .sort([[sorter, order]])
    // .skip(current * pageSize)
    // .limit(pageSize)
    .exec((err, attributeConfigurations) => {
      if (err) {
        return res.status(400).json({
          error: 'attributeConfigurations not found',
        });
      }

      res.json({
        data: attributeConfigurations,
        total,
        success: true,
        pageSize,
        current,
      });
    });
};
