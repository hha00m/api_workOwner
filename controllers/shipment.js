const _ = require('lodash');
const Shipment = require('../models/shipment');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.shipmentById = (req, res, next, id) => {
  Shipment.findById(id).exec((err, shipment) => {
    if (err || !shipment) {
      return res.status(400).json({
        error: 'shipment not found',
      });
    }
    console.log('shipment found ...');
    req.shipment = shipment;
    next();
  });
};

exports.read = (req, res) => {
  req.shipment.photo = undefined;
  return res.json(req.shipment);
};

exports.create = (req, res) => {
  const shipment = new Shipment(req.body);
  shipment.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ success: true, data });
  });
};
exports.remove = (req, res) => {
  Shipment.deleteOne({ _id: req.body.key[0] }).then((result) => {
    res.json({
      success: true,
      message: 'shipment deleted successfully',
    });
  }).catch((err) => {
    return res.status(400).json({
      error: errorHandler(err),
    });
  })
};
exports.update = (req, res) => {
  Shipment.update({ _id: req.body.id }, {
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

  Shipment
    .find()
    // .skip(pageSize * current)
    // .limit(pageSize)
    .sort({ name: 1 })
    .then((shipments) => {
      res.json({
        data: shipments,
        success: true,
        current,
        pageSize,
        total: shipments.length,
      });
    }).catch((err) => {
      return res.status(400).json({
        success: false,
        error: 'shipment not found',
      })
    })

};
