const formidable = require("formidable");
const _ = require("lodash");
const OrderType = require("../models/orderType");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.orderTypeById = (req, res, next, id) => {
  OrderType.findById(id).exec((err, orderType) => {
        if (err || !orderType) {
            return res.status(400).json({
                error: "receipt not found"
            });
        }
        req.orderType = orderType;
        next();
    });
};


exports.create = (req, res) => {
  const orderType = new OrderType(req.body);
  orderType.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  return res.json(req.orderType);
};

exports.update = (req, res) => {
  const orderType = req.orderType;
  orderType.name = req.body.name;
  orderType.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  const orderType = req.orderType;
  orderType.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'orderType deleted',
    });
  });
};


exports.list = (req, res) => {
  OrderType.find( )
      .exec((err, orderTypes) => {
          if (err) {
              return res.status(400).json({
                  error: "OrderType not found"
              });
          }
          res.json(orderTypes);
      });
};
