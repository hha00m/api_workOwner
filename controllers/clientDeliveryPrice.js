const formidable = require("formidable");
const _ = require("lodash");
const ClientDeliveryPrice = require("../models/clientDeliveryPrice");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.clientDeliveryPriceById = (req, res, next, id) => {
  ClientDeliveryPrice.findById(id).exec((err, clientDeliveryPrice) => {
        if (err || !clientDeliveryPrice) {
            return res.status(400).json({
                error: "ClientDeliveryPrice not found"
            });
        }
        req.town = town;
        next();
    });
};

exports.read = (req, res) => {
    req.clientDeliveryPrice.photo = undefined;
    return res.json(req.clientDeliveryPrice);
};

exports.create = (req, res) => {
  const clientDeliveryPrice = new ClientDeliveryPrice(req.body);
  clientDeliveryPrice.save((err, data) => {
      if (err) {
          return res.status(400).json({
              error: errorHandler(err)
          });
      }
      res.json({ data });
  });
};


exports.remove = (req, res) => {
    let clientDeliveryPrice = req.clientDeliveryPrice;
    clientDeliveryPrice.remove((err, deletedClientDeliveryPrice) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "ClientDeliveryPrice deleted successfully"
        });
    });
};
exports.update = (req, res) => {
  const clientDeliveryPrice = req.clientDeliveryPrice;
  clientDeliveryPrice.name = req.body.name;
  clientDeliveryPrice.save((err, data) => {
      if (err) {
          return res.status(400).json({
              error: errorHandler(err)
          });
      }
      res.json(data);
  });
};

// List of prices for certain client
exports.list = (req, res) => {

  ClientDeliveryPrice.find({client: req.clientDeliveryPrice.client}).exec((err, clientDeliveryPrice) => {
            if (err) {
                return res.status(400).json({
                    error: "ClientDeliveryPrice not found"
                });
            }
            res.json(clientDeliveryPrices);
        });
};

