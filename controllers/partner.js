const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Partner = require('../models/partner');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.partnerById = (req, res, next, id) => {
  Partner.findById(id).exec((err, partner) => {
    if (err || !partner) {
      return res.status(400).json({
        error: 'partner not found',
      });
    }
    console.log('partner found ...');
    req.partner = partner;
    next();
  });
};

exports.read = (req, res) => {
  req.partner.photo = undefined;
  return res.json(req.partner);
};

exports.create = (req, res) => {
  console.log(req.body);
  const partner = new Partner(req.body);
  partner.save((err, data) => {
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
  let partner = req.partner;
  partner.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'partner deleted successfully',
    });
  });
};
exports.update = (req, res) => {
  const partner = req.partner;
  partner.name = req.body.name;
  partner.center = req.body.center;
  partner.note = req.body.note;
  partner.city = req.body.city;
  partner.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    console.log(data);
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
  const total = Partner.find(query).count;
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

  Partner.find(query)
    .populate({
      path: 'city',
      match: { name: { $regex: '.*' + fCity + '.*' } },
    })
    .populate('town')
    .populate('branch')
    .sort([[sorter, order]])
    .skip(current * pageSize)
    .limit(pageSize)
    .exec((err, partners) => {
      if (err) {
        return res.status(400).json({
          error: 'partners not found',
        });
      }

      res.json({
        data: partners,
        total,
        success: true,
        pageSize,
        current,
      });
    });
};
exports.logo = (req, res, next) => {
  console.log("you are here")
  if (req.partner.logo.data) {
      res.set("Content-Type", req.partner.logo.contentType);
      return res.send(req.partner.logo.data);
  }
  next();
};
