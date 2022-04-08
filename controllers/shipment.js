const _ = require('lodash');
const Shipment = require('../models/shipment');
const { errorHandler } = require('../helpers/dbErrorHandler');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

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
  try {
    Shipment.update({ _id: req.body.id }, {
      $set: {
        clientStatus: req.body.clientStatus,
        driverStatus: req.body.driverStatus,
        branchStatus: req.body.branchStatus,
        driver: req.body.driver,
        importStorage: req.body.importStorage,
        clientInvoice: req.body.clientInvoice,
        isParitalReturn: req.body.driverStatus?.name && (req.body.driverStatus.name === "راجع جزئي" ? true : false),
        isReturned: req.body.driverStatus?.name && (req.body.driverStatus.name === "راجع كلي" ? true : false),
        isClientInvoiceGenrated: req.body.isClientInvoiceGenrated,
      },
    }).then((result) => {
      res.json({ result, success: true })
    })
      .catch((err) => {
        return res.status(400).json({ error: errorHandler(err) })
      })
  } catch (err) {
    return res.status(400).json({ error: errorHandler(err) })
  }

};

exports.updateInvoice = (req, res) => {
  try {
    Shipment.update({ _id: req.body.id }, {
      $set: {
        clientInvoice: req.body.clientInvoice.invoiceId,
      },
    }).then((result) => {
      res.json({ result, success: true })
    })
      .catch((err) => {
        return res.status(400).json({ error: errorHandler(err) })
      })
  } catch (err) {
    return res.status(400).json({ error: errorHandler(err) })
  }

};

exports.ShipmentByClick = (req, res) => {
  const store = req?.query?.store;
  const startDate = new Date(req?.query?.range[0]);
  const endDate = new Date(req?.query?.range[1]);
  const status = req?.query?.status;
  Shipment
    .find({
      $or: [
        { shipment_no: req.query?.shipment_no ? req.query?.shipment_no : '' },
        { customerMobile: req.query.customerMobile ? req.query.customerMobile : '' }],
      createdAt: { $gte: (startDate), $lt: (endDate) }, "store._id": (store),
      'clientStatus.name': { "$in": status },
      clientInvoice: { $exists: false }
    })
    .then((shipments) => {
      res.json({
        data: shipments,
        success: true,
      });
    }).catch((err) => {
      return res.status(400).json({
        success: false,
        error: 'shipment not found',
      })
    })
}
exports.list = (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  const current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0

  Shipment
    .find()
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
exports.listForAccounting = (req, res) => {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
    const current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0
    const store = req?.query?.store;
    const startDate = new Date(req?.query?.range[0]);
    const endDate = new Date(req?.query?.range[1]);
    const status = req?.query?.status;
    Shipment
      .find({
        createdAt: { $gte: (startDate), $lt: (endDate) }, "store._id": (store),
        clientInvoice: { $exists: false },
        'clientStatus.name': { "$in": status }
      })
      // .skip(pageSize * current)
      // .limit(pageSize)
      .sort({ shipment_no: 1 })
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
  }
  catch (err) {
    return res.json({
      data: [],
      success: true,
      current,
      pageSize,
      total: 0,
    });
  }

};
