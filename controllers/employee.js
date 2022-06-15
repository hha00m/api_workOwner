const _ = require('lodash');
const Employee = require('../models/employee');
const { errorHandler } = require('../helpers/dbErrorHandler');
const { default: mongoose } = require('mongoose');

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
  Employee.deleteMany({ '_id': { '$in': req.body.keys } })
    .then((result) => {
      res.json({
        success: true,
        message: 'store deleted successfully',
      });
    }).catch((err) => {
      return res.status(400).json({
        error: errorHandler(err),
        success: false,
      });
    })
};
exports.update = (req, res) => {
  Employee.update({ _id: req.body.id }, {
    $set: {
      name: req.body.name,
      note: req.body.note,
      government: req.body.government,
      salary: req.body.salary,
      center: req.body.center
    },
  }).then((result) => { res.json(result) })
    .catch((err) => {
      return res.status(400).json({ error: errorHandler(err) })
    })
};

const prepareQuery = (
  name,
  branch,
  jobTitle,
  mobile,
  salary,
  createdAt
) => {
  let query = {};
  name ? query['name'] = name : '';
  branch ? query['branch'] = mongoose.Types.ObjectId(branch) : '';
  jobTitle ? query['jobTitle'] = mongoose.Types.ObjectId(jobTitle) : '';
  mobile ? query['mobile'] = mobile : '';
  salary ? query['salary'] = salary : '';
  createdAt ? query['createdAt'] = { $gte: (createdAt[0]), $lt: (createdAt[1]) } : '';
  return query;
}
exports.list = (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  const current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0
  const query = prepareQuery(
    req?.query?.name,
    req?.query?.branch,
    req?.query?.jobTitle,
    req?.query?.mobile,
    req?.query?.salary,
    req?.query?.createdAt);


  Employee
    .find(query)
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
