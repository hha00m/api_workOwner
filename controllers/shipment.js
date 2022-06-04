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
  try {
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
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }

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

        shipment_no: req.body.shipment_no,
        originalPrice: req.body.originalPrice,
        newPrice: req.body.newPrice,
        isBreakable: req.body.isBreakable,
        pay: req.body.pay,
        customerMobile: req.body.customerMobile,
        weight: req.body.weight,
        confirm: req.body.confirm,
        note: req.body.note,
        address: req.body.address,
        clientDeliveryPrice: req.body.clientDeliveryPrice,
        driverDeliveryPrice: req.body.driverDeliveryPrice,
        branchDeliveryPrice: req.body.branchDeliveryPrice,
        senderBranchPrice: req.body.senderBranchPrice,
        driverMoneyStatus: req.body.driverMoneyStatus,
        clientMoneyStatus: req.body.clientMoneyStatus,
        BranchMoneyStatus: req.body.BranchMoneyStatus,
        toGovernment: req.body.toGovernment,
        toTown: req.body.toTown,
        toBranch: req.body.toBranch,
        fromBranch: req.body.fromBranch,
        store: req.body.store,
        clientDInvoiceIndex: req.body.clientDInvoiceIndex,
        driverDInvoiceIndex: req.body.driverDInvoiceIndex,
        branchDInvoiceIndex: req.body.clientDInvoiceIndex,


      },
    }).then((result) => {
      res.json({ result, success: true })
    })
      .catch((err) => {
        return res.status(400).json({ error: errorHandler(err), sucess: false })
      })
  } catch (err) {
    return res.status(400).json({ error: errorHandler(err), sucess: false })
  }

};
exports.updateInvoice = (req, res) => {
  try {
    Shipment.update({ _id: req.body.id }, {
      $set: {
        clientInvoice: req.body.clientInvoice.invoiceId,
        clientDInvoiceIndex: req.body.clientDInvoiceIndex,
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
exports.updateInvoice_driver = (req, res) => {
  try {
    Shipment.update({ _id: req.body.id }, {
      $set: {
        driverInvoice: req.body.driverInvoice.invoiceId,
        driverDInvoiceIndex: req.body.driverDInvoiceIndex,
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
exports.updateInvoice_branch = (req, res) => {
  try {
    Shipment.update({ _id: req.body.id }, {
      $set: {
        branchInvoice: req.body.branchInvoice.invoiceId,
        branchDInvoiceIndex: req.body.branchDInvoiceIndex,
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
const prepareQuery = (shipment_no, customerMobile, toGovernment,
  clientStatus, driverStatus, branchStatus, driver, note, senderBranchPrice,
  clientDeliveryPrice, driverDeliveryPrice, fromBranch, toBranch, toTown, store,
  clientInvoice, branchInvoice, driverInvoice, createdAt, branchDeliveryPrice, createdBy
) => {
  let query = {};

  shipment_no ? query['shipment_no'] = shipment_no : '';
  customerMobile ? query['customerMobile'] = customerMobile : '';
  toGovernment ? query['toGovernment._id'] = toGovernment : '';
  clientStatus ? query['clientStatus._id'] = { "$in": clientStatus } : '';
  driverStatus ? query['driverStatus._id'] = { "$in": driverStatus } : '';
  branchStatus ? query['branchStatus._id'] = { "$in": branchStatus } : '';
  driver ? query['driver._id'] = driver : '';
  note ? query['note'] = note : '';
  senderBranchPrice ? query['senderBranchPrice'] = senderBranchPrice : '';
  clientDeliveryPrice ? query['clientDeliveryPrice'] = { $gte: (clientDeliveryPrice) } : '';
  driverDeliveryPrice ? query['driverDeliveryPrice'] = { $gte: (driverDeliveryPrice) } : '';
  branchDeliveryPrice ? query['branchDeliveryPrice'] = { $gte: (branchDeliveryPrice) } : '';
  fromBranch ? query['fromBranch._id'] = fromBranch : '';
  toBranch ? query['toBranch._id'] = toBranch : '';
  toTown ? query['toTown._id'] = toTown : '';
  store ? query['store._id'] = store : '';
  createdBy ? query['createdBy._id'] = createdBy : '';
  clientInvoice ? query['clientInvoice.invoiceNumber'] = clientInvoice : '';
  branchInvoice ? query['branchInvoice.invoiceNumber'] = branchInvoice : '';
  driverInvoice ? query['driverInvoice.invoiceNumber'] = driverInvoice : '';
  createdAt ? query['createdAt'] = { $gte: (createdAt[0]), $lt: (createdAt[1]) } : '';
  return query;


}
exports.list = (req, res) => {
  // const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  // const current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0

  const query = prepareQuery(req?.query?.shipment_no, req?.query?.customerMobile,
    req?.query?.toGovernment, req?.query?.clientStatus, req?.query?.driverStatus,
    req?.query?.branchStatus, req?.query?.driver, req?.query?.note, req?.query?.senderBranchPrice,
    req?.query?.clientDeliveryPrice, req?.query?.driverDeliveryPrice, req?.query?.fromBranch, req?.query?.toBranch,
    req?.query?.toTown, req?.query?.store, req?.query?.clientInvoice, req?.query?.branchInvoice,
    req?.query?.driverInvoice, req?.query?.createdAt, req?.query?.branchDeliveryPrice, req?.query?.createdBy);

  Shipment
    .find(query)
    .sort({ name: 1 })
    .then((shipments) => {
      res.json({
        data: shipments,
        success: true,
        // current,
        // pageSize,
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
exports.listForAccounting_driver = (req, res) => {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
    const current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0
    const driver = req?.query?.driver;
    const startDate = new Date(req?.query?.range[0]);
    const endDate = new Date(req?.query?.range[1]);
    const status = req?.query?.status;
    Shipment
      .find({
        createdAt: { $gte: (startDate), $lt: (endDate) }, "driver._id": (driver),
        driverInvoice: { $exists: false },
        'driverStatus.name': { "$in": status }
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
exports.listForAccounting_branch = (req, res) => {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
    const current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0
    const branch = req?.query?.branch;
    const startDate = new Date(req?.query?.range[0]);
    const endDate = new Date(req?.query?.range[1]);
    const status = req?.query?.status;
    Shipment
      .find({
        createdAt: { $gte: (startDate), $lt: (endDate) }, "toBranch._id": (branch),
        branchInvoice: { $exists: false },
        'branchStatus.name': { "$in": status }
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
exports.ShipmentByClick_driver = (req, res) => {
  const driver = req?.query?.driver;
  const startDate = new Date(req?.query?.range[0]);
  const endDate = new Date(req?.query?.range[1]);
  const status = req?.query?.status;
  Shipment
    .find({
      $or: [
        { shipment_no: req.query?.shipment_no ? req.query?.shipment_no : '' },
        { customerMobile: req.query.customerMobile ? req.query.customerMobile : '' }],
      createdAt: { $gte: (startDate), $lt: (endDate) }, "driver._id": (driver),
      'driverStatus.name': { "$in": status },
      driverInvoice: { $exists: false }
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
exports.ShipmentByClick_branch = (req, res) => {
  const branch = req?.query?.branch;
  const startDate = new Date(req?.query?.range[0]);
  const endDate = new Date(req?.query?.range[1]);
  const status = req?.query?.status;
  Shipment
    .find({
      $or: [
        { shipment_no: req.query?.shipment_no ? req.query?.shipment_no : '' },
        { customerMobile: req.query.customerMobile ? req.query.customerMobile : '' }],
      createdAt: { $gte: (startDate), $lt: (endDate) }, "toBranch._id": (branch),
      'branchStatus.name': { "$in": status },
      branchInvoice: { $exists: false }
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