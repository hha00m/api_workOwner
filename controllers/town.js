const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Town = require("../models/town");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.townById = (req, res, next, id) => {
  Town.findById(id).exec((err, town) => {
        if (err || !town) {
            return res.status(400).json({
                error: "town not found"
            });
        }
        req.town = town;
        next();
    });
};

exports.read = (req, res) => {
    req.town.photo = undefined;
    return res.json(req.town);
};

exports.create = (req, res) => {
  const town = new Town(req.body);
  town.save((err, data) => {
      if (err) {
          return res.status(400).json({
              error: errorHandler(err)
          });
      }
      res.json({ data });
  });
};


exports.remove = (req, res) => {
    let town = req.town;
    town.remove((err, deletedTown) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "town deleted successfully"
        });
    });
};
exports.update = (req, res) => {
  const town = req.town;
  town.name = req.body.name;
  town.save((err, data) => {
      if (err) {
          return res.status(400).json({
              error: errorHandler(err)
          });
      }
      res.json(data);
  });
};


exports.list = (req, res) => {

  Town.find().exec((err, towns) => {
            if (err) {
                return res.status(400).json({
                    error: "town not found"
                });
            }
            res.json(towns);
        });
};

