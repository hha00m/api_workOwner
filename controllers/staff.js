const formidable = require("formidable");
const _ = require("lodash");
const Staff = require("../models/staff");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.staffById = (req, res, next, id) => {
  Staff.findById(id).exec((err, staff) => {
    if (err || !staff) {
      return res.status(400).json({
        error: "staff not found"
      });
    }
    req.staff = staff;
    next();
  });
};
exports.create = (req, res) => {
  const staff = new Staff(req.body);
  staff.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};
exports.read = (req, res) => {
  return res.json(req.staff);
};
exports.update = (req, res) => {
  Staff.update({ _id: req.body.id }, {
    $set: {
      name: req.body.name,
      note: req.body.note,
      mobile: req.body.mobile,
      salary: req.body.salary,
      jobTitle: req.body.jobTitle,
      branch: req.body.branch,

    },
  }).then((result) => { res.json({ result, success: true }) })
    .catch((err) => {
      return res.status(400).json({ error: errorHandler(err) })
    })


};
exports.remove = (req, res) => {
  Staff.deleteMany({ '_id': { '$in': req.body.keys } })
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

  const query = prepareQuery(
    req?.query?.name,
    req?.query?.branch,
    req?.query?.jobTitle,
    req?.query?.mobile,
    req?.query?.salary,
    req?.query?.createdAt);

  Staff.find(query)
    .exec((err, staffs) => {
      if (err) {
        return res.status(400).json({
          error: "staffs not found"
        });
      }
      res.json(staffs);
    });
};
