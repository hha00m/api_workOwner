const formidable = require("formidable");
const _ = require("lodash");
const Address = require("../models/address");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.addressById = (req, res, next, id) => {
  Address.findById(id).exec((err, address) => {
        if (err || !address) {
            return res.status(400).json({
                error: "address not found"
            });
        }
        req.address = address;
        next();
    });
};
exports.list = (req, res) => {
  Address.find( )
      .exec((err, addresses) => {
          if (err) {
              return res.status(400).json({
                  error: "addresses not found"
              });
          }
          res.json(addresses);
      });
};
