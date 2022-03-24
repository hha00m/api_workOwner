const _ = require('lodash');
const Employee = require('../models/deletedEmployee');
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
  Employee.deleteOne({ _id: req.body.key[0] }).then((result) => {
    res.json({
      message: 'employee deleted successfully',
    });
  }).catch((err) => {
    return res.status(400).json({
      error: errorHandler(err),
    });
  })
};
exports.update = (req, res) => {
  Employee.update({ _id: req.body.id }, {
    $set: {
      name: req.body.name,
      mobile: req.body.mobile,
      photo: req.body.photo,
      note: req.body.note,
      brunch: req.body.brunch,
      jobTitle: req.body.jobTitle
    },
  }).then((result) => { res.json(result) })
    .catch((err) => {
      return res.status(400).json({ error: errorHandler(err) })
    })
};


exports.list = (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  const current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0
  const q = req.query.name ? { $text: { $search: req.query.name } } :
    req.query.note ? { $text: { $search: req.query.note } } : req.query.government ? { $text: { $search: req.query.government } } : {}

  Employee
    .find(q)
    .populate('jobTitle', 'name _id')
    .populate('branch', 'name _id')
    // .skip(pageSize * current)
    // .limit(pageSize)
    .sort({ name: 1 })
    .then((employees) => {
      res.json({
        data: employees,
        success: true,
        current,
        pageSize,
        total: employees.length,
      });
    }).catch((err) => {
      return res.status(400).json({
        success: false,
        error: 'employee not found',
      })
    })

};
