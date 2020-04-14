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
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  // console.log(req);
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
          center,
      } = fields;
console.log(name, city);
      if (
          !name ||
          !city
                ) {
          return res.status(400).json({
              error: "All fields are required"
          });
      }

      let town = new Town(fields);



      town.save((err, result) => {
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

  Town.aggregate([{
    $lookup:
        {
            from: "cities",
            localField: "city",
            foreignField:"_id",
            as:"cities"
        }
    }]).exec((err, towns) => {
                if (err) {
                    return res.status(400).json({
                        error: "town not found"
                    });
                }
                res.json(towns);
            });

    };
  // Town.find().exec((err, towns) => {
  //           if (err) {
  //               return res.status(400).json({
  //                   error: "town not found"
  //               });
  //           }
  //           res.json(towns);
  //       });


