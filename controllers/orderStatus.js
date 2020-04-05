const Order_status = require("../models/order_status");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.orderStatusById = (req, res, next, id) => {
  Order_status.findById(id).exec((err, order_status) => {
        if (err || !order_status) {
            return res.status(400).json({
                error: "المدينه غير موجودة يرجى اضافتها"
            });
        }
        req.order_status = order_status;
        next();
    });
};

exports.create = (req, res) => {
    const order_status = new Order_status(req.body);
    order_status.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({ data });
    });
};

exports.read = (req, res) => {
    return res.json(req.order_status);
};

exports.update = (req, res) => {
    const order_status = req.order_status;
    order_status.name = req.body.name;
    order_status.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.remove = (req, res) => {
    const order_status = req.order_status;
    order_status.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "order_status deleted"
        });
    });
};

exports.list = (req, res) => {
  Order_status.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
