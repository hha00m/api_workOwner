const _ = require('lodash');
const Invoice = require('../models/invoice');
const { errorHandler } = require('../helpers/dbErrorHandler');
const Shipment = require('../models/shipment');
const Store = require('../models/store');
const Driver = require('../models/driver');
const Branch = require('../models/branch');
var ObjectId = require('mongodb').ObjectID;

exports.invoiceById = (req, res, next, id) => {
  Invoice.findById(id).exec((err, invoice) => {
    if (err || !invoice) {
      return res.status(400).json({
        error: 'invoice not found',
      });
    }
    console.log('invoice found ...');
    req.invoice = invoice;
    next();
  });
};
exports.read = (req, res) => {
  req.invoice.photo = undefined;
  return res.json(req.invoice);
};
exports.create = async (req, res) => {
  const number = await Invoice.find({}).sort({ _id: -1 }).limit(1)
  const store = await Store.find({ _id: req.body[0].store })
  let inv = {
    path: req.body[0]?.path,
    isPaid: req.body[0]?.isPaid,
    isReturned: req.body[0]?.isReturned,
    numberOfshipments: req.body[0]?.numberOfshipments,
    store: store[0],
    totalDeliveryPrice: req.body[0]?.totalDeliveryPrice ? req.body[0]?.totalDeliveryPrice : 0,
    totalPrice: req.body[0]?.totalPrice ? req.body[0]?.totalPrice : 0,
    employee: req.body[0]?.employee,
    invoiceNumber: number[0] ? number[0]?.invoiceNumber + 1 : 1
  }
  const invoice = new Invoice(inv);
  invoice.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
        success: false
      });
    }
    res.json({ success: true, data });
  });
};
exports.create_driver = async (req, res) => {
  const number = await Invoice.find({}).sort({ _id: -1 }).limit(1)
  const driver = await Driver.find({ _id: req.body[0].driver })
  let inv = {
    path: req.body[0]?.path,
    isPaid: req.body[0]?.isPaid,
    isReturned: req.body[0]?.isReturned,
    numberOfshipments: req.body[0]?.numberOfshipments,
    driver: driver[0],
    totalDeliveryPrice: req.body[0]?.totalDeliveryPrice ? req.body[0]?.totalDeliveryPrice : 0,
    totalPrice: req.body[0]?.totalPrice ? req.body[0]?.totalPrice : 0,
    employee: req.body[0]?.employee,
    invoiceNumber: number[0] ? number[0]?.invoiceNumber + 1 : 1
  }
  const invoice = new Invoice(inv);
  invoice.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
        success: false
      });
    }
    res.json({ success: true, data });
  });
};
exports.create_branch = async (req, res) => {
  const number = await Invoice.find({}).sort({ _id: -1 }).limit(1)
  const branch = await Branch.find({ _id: req.body[0].branch })
  let inv = {
    path: req.body[0]?.path,
    isPaid: req.body[0]?.isPaid,
    isReturned: req.body[0]?.isReturned,
    numberOfshipments: req.body[0]?.numberOfshipments,
    branch: branch[0],
    totalDeliveryPrice: req.body[0]?.totalDeliveryPrice ? req.body[0]?.totalDeliveryPrice : 0,
    totalPrice: req.body[0]?.totalPrice ? req.body[0]?.totalPrice : 0,
    employee: req.body[0]?.employee,
    invoiceNumber: number[0] ? number[0]?.invoiceNumber + 1 : 1
  }
  const invoice = new Invoice(inv);
  invoice.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
        success: false
      });
    }
    res.json({ success: true, data });
  });
};
const removeInvoiceFromShipments = async (id) => {
  try {
    await Shipment.update({ 'clientInvoice._id': ObjectId(id) }, {
      $unset: {
        clientInvoice: {},
      }
    }).then((result) => {
      return true
    }).catch((err) => {
      return false
    })
  } catch (err) {
    return false
  }
}
exports.remove = (req, res) => {
  removeInvoiceFromShipments(req?.query?.key)
  Invoice.deleteOne({ _id: req?.query?.key }).then((result) => {
    res.json({
      success: true,
      message: 'invoice deleted successfully',
    });
  }).catch((err) => {
    return res.status(400).json({
      error: errorHandler(err),
    });
  })
};
const removeInvoiceFromShipments_branch = async (id) => {
  try {
    await Shipment.update({ 'branchInvoice._id': ObjectId(id) }, {
      $unset: {
        branchInvoice: {},
      }
    }).then((result) => {
      return true
    }).catch((err) => {
      return false
    })
  } catch (err) {
    return false
  }
}
exports.remove_branch = (req, res) => {
  removeInvoiceFromShipments_branch(req?.query?.key)
  Invoice.deleteOne({ _id: req?.query?.key }).then((result) => {
    res.json({
      success: true,
      message: 'invoice deleted successfully',
    });
  }).catch((err) => {
    return res.status(400).json({
      error: errorHandler(err),
    });
  })
};
const removeInvoiceFromShipments_driver = async (id) => {
  try {
    await Shipment.update({ 'driverInvoice._id': ObjectId(id) }, {
      $unset: {
        driverInvoice: {},
      }
    }).then((result) => {
      return true
    }).catch((err) => {
      return false
    })
  } catch (err) {
    return false
  }
}
exports.remove_driver = (req, res) => {
  removeInvoiceFromShipments_driver(req?.query?.key)
  Invoice.deleteOne({ _id: req?.query?.key }).then((result) => {
    res.json({
      success: true,
      message: 'invoice deleted successfully',
    });
  }).catch((err) => {
    return res.status(400).json({
      error: errorHandler(err),
    });
  })
};
exports.update = (req, res) => {
  Invoice.update({ _id: req.body.id }, {
    $set: {
      store: req.body.store,
      client: req.body.client,
      driver: req.body.driver,
      branch: req.body.branch,
      path: req.body.path,
      isPaid: req.body.isPaid,
      isReturned: req.body.isReturned,
      totalPrice: req.body.totalPrice,
      totalDeliveryPrice: req.body.totalDeliveryPrice,
      unRemovable: req.body.unRemovable,
      employee: req.body.employee,
    },
  }).then((result) => { res.json({ result, success: true }) })
    .catch((err) => {
      return res.status(400).json({ error: errorHandler(err) })
    })


};
exports.list = (req, res) => {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
    const current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0
    const store = req?.query?.store ? { "store._id": (req?.query?.store) } : req?.query?.driver ? { "driver._id": (req?.query?.driver) } : req?.query?.branch ? { "branch._id": (req?.query?.branch) } : {}
    // const startDate = new Date(req?.query?.range[0]);
    // const endDate = new Date(req?.query?.range[1]);
    Invoice
      .find(store)
      // .skip(pageSize * current)
      // .limit(pageSize)
      .sort({ name: 1 })
      .then((invoices) => {
        res.json({
          data: invoices,
          success: true,
          current,
          pageSize,
          total: invoices.length,
        });
      }).catch((err) => {
        return res.status(400).json({
          success: false,
          error: 'invoice not found',
        })
      })
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: 'invoice not found',
    })
  }

};
exports.list_driver = (req, res) => {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
    const current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0
    const store = req?.query?.store ? { "store._id": (req?.query?.store) } : req?.query?.driver ? { "driver._id": (req?.query?.driver) } : req?.query?.branch ? { "branch._id": (req?.query?.branch) } : {}
    // const startDate = new Date(req?.query?.range[0]);
    // const endDate = new Date(req?.query?.range[1]);
    Invoice
      .find(store)
      // .skip(pageSize * current)
      // .limit(pageSize)
      .sort({ name: 1 })
      .then((invoices) => {
        res.json({
          data: invoices,
          success: true,
          current,
          pageSize,
          total: invoices.length,
        });
      }).catch((err) => {
        return res.status(400).json({
          success: false,
          error: 'invoice not found',
        })
      })
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: 'invoice not found',
    })
  }

};
exports.list_branch = (req, res) => {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
    const current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0
    const store = req?.query?.store ? { "store._id": (req?.query?.store) } : req?.query?.driver ? { "driver._id": (req?.query?.driver) } : req?.query?.branch ? { "branch._id": (req?.query?.branch) } : {}
    // const startDate = new Date(req?.query?.range[0]);
    // const endDate = new Date(req?.query?.range[1]);
    Invoice
      .find(store)
      // .skip(pageSize * current)
      // .limit(pageSize)
      .sort({ name: 1 })
      .then((invoices) => {
        res.json({
          data: invoices,
          success: true,
          current,
          pageSize,
          total: invoices.length,
        });
      }).catch((err) => {
        return res.status(400).json({
          success: false,
          error: 'invoice not found',
        })
      })
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: 'invoice not found',
    })
  }

};