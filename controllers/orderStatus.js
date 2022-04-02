const _ = require('lodash');
const OrderStatus = require('../models/orderStatus');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.orderStatusById = (req, res, next, id) => {
  OrderStatus.findById(id).exec((err, orderStatus) => {
    if (err || !orderStatus) {
      return res.status(400).json({
        error: 'orderStatus not found',
      });
    }
    console.log('orderStatus found ...');
    req.orderStatus = orderStatus;
    next();
  });
};

exports.read = (req, res) => {
  req.orderStatus.photo = undefined;
  return res.json(req.orderStatus);
};

exports.create = (req, res) => {
  try {
    const s = { name: req.body.name, note: req.body.note }
    const orderStatus = new OrderStatus(s);
    orderStatus.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json({ success: true, data });
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  };
}
exports.remove = (req, res) => {
  OrderStatus.deleteOne({ _id: req.body.key[0] }).then((result) => {
    res.json({
      success: true,
      message: 'orderStatus deleted successfully',
    });
  }).catch((err) => {
    return res.status(400).json({
      error: errorHandler(err),
    });
  })
};
exports.update = (req, res) => {
  OrderStatus.update({ _id: req.body.id }, {
    $set: {
      name: req.body.name,
      note: req.body.note,
      client: req.body.client,
    },
  }).then((result) => { res.json({ result, success: true }) })
    .catch((err) => {
      return res.status(400).json({ error: errorHandler(err) })
    })


};


exports.list = (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  const current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0

  OrderStatus
    .find()
    // .skip(pageSize * current)
    // .limit(pageSize)
    .sort({ name: 1 })
    .then((orderStatuss) => {
      res.json({
        data: orderStatuss,
        success: true,
        current,
        pageSize,
        total: orderStatuss.length,
      });
    }).catch((err) => {
      return res.status(400).json({
        success: false,
        error: 'orderStatus not found',
      })
    })

};
