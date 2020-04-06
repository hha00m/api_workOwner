const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Branch = require("../models/branch");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.branchById = (req, res, next, id) => {
  Branch.findById(id).exec((err, branch) => {
        if (err || !branch) {
            return res.status(400).json({
                error: "Branch not found"
            });
        }
        req.branch = branch;
        next();
    });
};

exports.read = (req, res) => {
    req.branch.photo = undefined;
    return res.json(req.branch);
};

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        // check for all fields
        const {
            name,
            city,
            mobile,
        } = fields;

        if (
            !name ||
            !city ||
            !mobile
        ) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        let branch = new Branch(fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }
            branch.photo.data = fs.readFileSync(files.photo.path);
            branch.photo.contentType = files.photo.type;
        }

        branch.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

exports.remove = (req, res) => {
    let branch = req.branch;
    branch.remove((err, deletedbranch) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "branch deleted successfully"
        });
    });
};

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        // check for all fields
        const {
            name,
            mobile,
            city,
        } = fields;

        if (
            !name ||
            !mobile ||
            !city
            ) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        let branch = req.branch;
        branch = _.extend(branch, fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }
            branch.photo.data = fs.readFileSync(files.photo.path);
            branch.photo.contentType = files.photo.type;
        }

        branch.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

exports.photo = (req, res, next) => {
  if (req.branch.photo.data) {
      res.set("Content-Type", req.branch.photo.contentType);
      return res.send(req.branch.photo.data);
  }
  next();
};

exports.list = (req, res) => {
  Branch.find()
      .exec((err, branches) => {
          if (err) {
              return res.status(400).json({
                  error: "branches not found"
              });
          }
          res.json(branches);
      });
};
