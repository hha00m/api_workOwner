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
exports.read = (req, res) => {
  req.address.photo = undefined;
  return res.json(req.s);
};

exports.create = (req, res) => {
const address = new Address(req.body);
address.save((err, data) => {
    if (err) {
        return res.status(400).json({
            error: errorHandler(err)
        });
    }
    res.json({ data });
});
};


exports.remove = (req, res) => {
  let address = req.address;
  store.remove((err, deletedaddress) => {
      if (err) {
          return res.status(400).json({
              error: errorHandler(err)
          });
      }
      res.json({
          message: "address deleted successfully"
      });
  });
};
exports.update = (req, res) => {
const address = req.address;
address.name = req.body.name;
address.save((err, data) => {
    if (err) {
        return res.status(400).json({
            error: errorHandler(err)
        });
    }
    res.json(data);
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
