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
  const staff = req.staff;
  staff.name = req.body.name;
  staff.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};
exports.remove = (req, res) => {
  const staff = req.staff;
  staff.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'staff deleted',
    });
  });
};


const prepareQuery = (
  name,
  branch,
  jobTitle,
  mobile,
  createdAt
) => {
  let query = {};
  name ? query['name'] = name : '';
  branch ? query['branch'] = mongoose.Types.ObjectId(branch) : '';
  jobTitle ? query['jobTitle'] = mongoose.Types.ObjectId(jobTitle) : '';
  mobile ? query['mobile'] = mobile : '';
  createdAt ? query['createdAt'] = { $gte: (createdAt[0]), $lt: (createdAt[1]) } : '';
  return query;
}

exports.list = (req, res) => {

  const query = prepareQuery(
    req?.query?.name,
    req?.query?.branch,
    req?.query?.jobTitle,
    req?.query?.mobile,
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
