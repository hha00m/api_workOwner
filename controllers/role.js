const formidable = require("formidable");
const _ = require("lodash");
const Role = require("../models/role");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.roleById = (req, res, next, id) => {
  Role.findById(id).exec((err, role) => {
        if (err || !role) {
            return res.status(400).json({
                error: "role not found"
            });
        }
        req.role = role;
        next();
    });
};

exports.create = (req, res) => {
  const role = new Role(req.body);
  role.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  return res.json(req.role);
};

exports.update = (req, res) => {
  const role = req.role;
  role.name = req.body.name;
  role.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  const role = req.role;
  role.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'role deleted',
    });
  });
};


exports.list = (req, res) => {
  Role.find( )
      .exec((err, roles) => {
          if (err) {
              return res.status(400).json({
                  error: "roles not found"
              });
          }
          res.json(roles);
      });
};
