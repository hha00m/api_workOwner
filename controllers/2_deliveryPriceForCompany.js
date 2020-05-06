const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const DeliveryPriceForCompany = require('../models/2_deliveryPriceForCompany');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.deliveryPriceForCompanyById = (req, res, next, id) => {
  DeliveryPriceForCompany.findById(id).exec((err, deliveryPriceForCompany) => {
    if (err || !deliveryPriceForCompany) {
      return res.status(400).json({
        error: 'deliveryPriceForCompany not found',
      });
    }
    console.log('deliveryPriceForCompany found ...');
    req.deliveryPriceForCompany = deliveryPriceForCompany;
    next();
  });
};

exports.read = (req, res) => {
  req.deliveryPriceForCompany.photo = undefined;
  return res.json(req.deliveryPriceForCompany);
};

exports.create = (req, res) => {
  console.log( req.body)

  const deliveryPriceForCompany = new DeliveryPriceForCompany(req.body);
  deliveryPriceForCompany.save((err, data) => {
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
  let deliveryPriceForCompany = req.deliveryPriceForCompany;
  deliveryPriceForCompany.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'deliveryPriceForCompany deleted successfully',
    });
  });
};
exports.update = (req, res) => {
  const deliveryPriceForCompany = req.deliveryPriceForCompany;
  deliveryPriceForCompany.price = req.body.price;
  deliveryPriceForCompany.deliveryCompanyName = req.body.deliveryCompanyName;
  deliveryPriceForCompany.city = req.body.city;
  deliveryPriceForCompany.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

/**
 *  /api/deliveryPriceForCompanies?current=1&pageSize=20&sorter=
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
  const total = DeliveryPriceForCompany.find(query).count;


  DeliveryPriceForCompany.find(query)
    .populate({
      path: 'city',
      match: { name: { $regex: '.*' + fCity + '.*' } },
    })
    .populate(
       'deliveryCompanyName'
    )
    .sort([[sorter, order]])
    .skip(current * pageSize)
    .limit(pageSize)
    .exec((err, deliveryPriceForCompanies) => {
      if (err) {
        return res.status(400).json({
          error: 'deliveryPriceForCompanies not found',
        });
      }

      res.json({
        data: deliveryPriceForCompanies,
        total,
        success: true,
        pageSize,
        current,
      });
    });
};
