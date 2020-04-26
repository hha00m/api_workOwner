const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Permission = require('../models/permission');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.permissionById = (req, res, next, id) => {
  Permission.findById(id).exec((err, permission) => {
    if (err || !permission) {
      return res.status(400).json({
        error: 'permission not found',
      });
    }
    console.log('permission found ...');
    req.permission = permission;
    next();
  });
};

exports.read = (req, res) => {
  req.permission.photo = undefined;
  return res.json(req.permission);
};

exports.create = (req, res) => {
  //console.log("name is:",req.body.name," city is:", req.body.city,"    :",req.body.center,"     :",req.body.note)

  const permission = new Permission(req.body);
  permission.save((err, data) => {
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
  let permission = req.permission;
  permission.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'permission deleted successfully',
    });
  });
};
exports.update = (req, res) => {
  const permission = req.permission;
  permission.jobTitle = req.body.jobTitle;
  permission.websitePage = req.body.websitePage;
  permission.edit = req.body.edit;
  permission.delete = req.body.delete;
  permission.add = req.body.add;
  permission.read = req.body.read;
  permission.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

/**
 *  /api/permissions?current=1&pageSize=20&sorter=
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
  const total = Permission.find(query).count;
  // Permission.aggregate(
  //   [
  //       {
  //           "$project" : {
  //               // "_id" : NumberInt(0),
  //               "permissions" : "$$ROOT"
  //           }
  //       },
  //       {
  //           "$lookup" : {
  //               "localField" : "permissions.city",
  //               "from" : "cities",
  //               "foreignField" : "_id",
  //               "as" : "cities"
  //           }
  //       },
  //       {
  //         "$match": {"cities.name" : { $regex: '.*' + fCity + '.*' }}
  //       }

  //   ])

  Permission.find(query)
    .populate({
      path: 'city',
      match: { name: { $regex: '.*' + fCity + '.*' } },
    })
    .sort([[sorter, order]])
    .skip(current * pageSize)
    .limit(pageSize)
    .exec((err, permissions) => {
      if (err) {
        return res.status(400).json({
          error: 'permissions not found',
        });
      }

      res.json({
        data: permissions,
        total,
        success: true,
        pageSize,
        current,
      });
    });
};
