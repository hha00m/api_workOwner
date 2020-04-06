const OrderStatus = require("../models/orderStatus");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.orderStatusById = (req, res, next, id) => {
  OrderStatus.findById(id).exec((err, orderStatus) => {
        if (err || !orderStatus) {
            return res.status(400).json({
                error: "المدينه غير موجودة يرجى اضافتها"
            });
        }
        req.orderStatus = orderStatus;
        next();
    });
};

exports.create = (req, res) => {
    const orderStatus = new OrderStatus(req.body);
    orderStatus.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({ data });
    });
};

exports.read = (req, res) => {
    return res.json(req.orderStatus);
};

exports.update = (req, res) => {
    const orderStatus = req.orderStatus;
    orderStatus.name = req.body.name;
    orderStatus.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.remove = (req, res) => {
    const orderStatus = req.orderStatus;
    orderStatus.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "orderStatus deleted"
        });
    });
};

exports.list = (req, res) => {
  OrderStatus.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.create = (req, res) => {
  const orderStatus = new OrderStatus(req.body);
  orderStatus.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  return res.json(req.orderStatus);
};

exports.update = (req, res) => {
  const orderStatus = req.orderStatus;
  orderStatus.name = req.body.name;
  orderStatus.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  const orderStatus = req.orderStatus;
  orderStatus.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'orderStatus deleted',
    });
  });
};

exports.list = (req, res) => {
  OrderStatus.find( )
      .exec((err, orderStatuses) => {
          if (err) {
              return res.status(400).json({
                  error: "orderStatuses not found"
              });
          }
          res.json(orderStatuses);
      });
};
