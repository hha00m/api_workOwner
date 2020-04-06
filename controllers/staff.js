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

exports.list = (req, res) => {
  Staff.find({})
      .exec((err, staffs) => {
          if (err) {
              return res.status(400).json({
                  error: "staffs not found"
              });
          }
          res.json(staffs);
      });
};
