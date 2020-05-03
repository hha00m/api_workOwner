const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Order = require('../models/order');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.orderById = (req, res, next, id) => {
  Order.findById(id).exec((err, order) => {
    if (err || !order) {
      return res.status(400).json({
        error: 'order not found',
      });
    }
    console.log('order found ...');
    req.order = order;
    next();
  });
};

exports.read = (req, res) => {
  return res.json(req.order);
};

exports.create = (req, res) => {
  console.log(req.body);
  const order = new Order(req.body);
  order.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
      console.log(err);
    }
    res.json({ data });
  });
};
exports.remove = (req, res) => {
  // console.log('--------------');
  let order = req.order;
  order.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'order deleted successfully',
    });
  });
};
exports.update = (req, res) => {
  const order = req.order;
  order.order_no = req.body.order_no;
  order.price = req.body.price;
  order.newPrice = req.body.newPrice;
  order.isBreakable = req.body.isBreakable;
  order.client = req.body.client;
  order.driver = req.body.driver;
  order.toAddress = req.body.toAddress;
  order.deliveryPrice = req.body.deliveryPrice;
  order.fromBranch = req.body.fromBranch;
  order.toBranch = req.body.toBranch;
  order.customerMobile = req.body.customerMobile;
  order.isAgreed = req.body.isAgreed;
  order.customerName = req.body.customerName;
  order.qty = req.body.qty;
  order.weight = req.body.weight;
  order.store = req.body.store;
  order.note = req.body.note;
  order.isFilledByClient = req.body.isFilledByClient;
  order.filledBy = req.body.filledBy;
  order.confirmed = req.body.confirmed;

  order.save((err, data) => {
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
  let order1 = 1;
  try {
    let str = sort.split('_');
    sorter = str[0] ? str[0] : '_id';
    order1 = str[1] == 'ascend' ? 1 : -1;
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

  let pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  let current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0
  const total = Order.find(query).count;
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

  Order.find(query)

    .populate('store')
    .populate('moneyStatus')
    .populate('client')
    .populate('driver')
    .populate('toCity')
    .populate('orderStatus')
    .populate('category')
    .populate('filledBy')
    .populate('toTown')
    .populate('fromBranch')
    .populate('toBranch')
    .sort([[sorter, order1]])
    .skip(current * pageSize)
    .limit(pageSize)
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: 'orders not found',
        });
      }
      console.log(orders);
      res.json({
        data: orders,
        total,
        success: true,
        pageSize,
        current,
      });
    });
};
