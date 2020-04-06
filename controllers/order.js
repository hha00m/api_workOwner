const formidable = require("formidable");
const _ = require("lodash");
const Order = require("../models/order");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.orderById = (req, res, next, id) => {
  Order.findById(id).exec((err, order) => {
        if (err || !order) {
            return res.status(400).json({
                error: "order not found"
            });
        }
        req.order = order;
        next();
    });
};


exports.create = (req, res) => {
  const order = new Order(req.body);
  order.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  return res.json(req.order);
};

exports.update = (req, res) => {
  const order = req.order;
  order.name = req.body.name;
  order.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  const order = req.order;
  order.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'order deleted',
    });
  });
};


exports.list = (req, res) => {
  Order.find( )
      .exec((err, orders) => {
          if (err) {
              return res.status(400).json({
                  error: "orders not found"
              });
          }
          res.json(orders);
      });
};
