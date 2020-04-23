const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Branch = require('../models/branch');
const { errorHandler } = require('../helpers/dbErrorHandler');
exports.branchById = (req, res, next, id) => {
  Branch.findById(id).exec((err, branch) => {
    if (err || !branch) {
      return res.status(400).json({
        error: 'branch not found',
      });
    }
    console.log('branch found ...');
    req.branch = branch;
    next();
  });
};

exports.read = (req, res) => {
  req.branch.photo = undefined;
  return res.json(req.branch);
};

exports.create = (req, res) => {
  // console.log("name is:",req.body.name," city is:", req.body.city ,"     :",req.body.description)

  const branch = new Branch(req.body);
  branch.save((err, data) => {
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
  let branch = req.branch;
  branch.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'branch deleted successfully',
    });
  });
};
exports.update = (req, res) => {
  console.log("name is:",req.body.name," city is:", req.body.city ,"     :",req.body.description,"     ",req.body.mobile)

  const branch = req.branch;
  branch.name = req.body.name;
  branch.mobile = req.body.mobile;
  branch.description = req.body.description;
  branch.city = req.body.city;
  branch.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

/**
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

  //------------------------------------------------------
  var query = {};
   if (fName !== '') {
    query['$and'].push({ name: { $regex: '.*' + fName + '.*' } });
  }


  let pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  let current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0
  const total = Branch.find(query).count;
  Branch.find(query)
    .populate({
      path: 'city',
      match: { name: { $regex: '.*' + fCity + '.*' } },
    })
    .sort([[sorter, order]])
    .skip(current * pageSize)
    .limit(pageSize)
    .exec((err, branchs) => {
      if (err) {
        return res.status(400).json({
          error: 'branchs not found',
        });
      }

      res.json({
        data: branchs,
        total,
        success: true,
        pageSize,
        current,
      });
    });
};
