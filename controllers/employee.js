const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Employee = require('../models/employee');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.employeeById = (req, res, next, id) => {
  Employee.findById(id).exec((err, employee) => {
    if (err || !employee) {
      return res.status(400).json({
        error: 'employee not found',
      });
    }
    console.log('employee found ...');
    req.employee = employee;
    next();
  });
};

exports.read = (req, res) => {
  req.employee.photo = undefined;
  return res.json(req.employee);
};

exports.create = (req, res) => {
  console.log(req.body);
  const employee = new Employee(req.body);
  employee.save((err, data) => {
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
  let employee = req.employee;
  employee.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'Employee deleted successfully',
    });
  });
};
exports.update = (req, res) => {
  const employee = req.employee;
  employee.name = req.body.name;
  employee.town = req.body.town;
  employee.branch = req.body.branch;
  employee.address = req.body.address;
  employee.note = req.body.note;
  employee.city = req.body.city;
  employee.photo = req.body.photo;
  employee.mobile = req.body.mobile;
  employee.jobTitle = req.body.jobTitle;
  employee.save((err, data) => {
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

  let pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  let current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0
  const total = Employee.find(query).count;
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

  Employee.find(query)
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
    .exec((err, employees) => {
      if (err) {
        return res.status(400).json({
          error: 'Employees not found',
        });
      }

      res.json({
        data: employees,
        total,
        success: true,
        pageSize,
        current,
      });
    });
};
exports.photo = (req, res, next) => {
  console.log('you are here');
  if (req.employee.photo.data) {
    res.set('Content-Type', req.employee.photo.contentType);
    return res.send(req.employee.photo.data);
  }
  next();
};
