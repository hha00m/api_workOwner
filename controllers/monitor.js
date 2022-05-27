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
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  const current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0

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



resultsWithPromises = (query, res) => {
  var currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1);
  const firstBlock = new Promise((resolve, reject) => {

    Shipment
      .aggregate([
        { $match: { createdAt: { $gte: currentDate } } },
        { $group: { _id: "$clientStatus.name", count: { $sum: 1 } } },
      ])
      .then((shipments) => {
        resolve({
          first: {
            data: shipments,
            success: true,
            total: shipments.length,
          }
        })
        reject(new Error('first block error'));

      })
  });
  const secondBlock = new Promise((resolve, reject) => {
    Shipment
      // driverInvoice: { $exist: false }
      .aggregate([
        { $match: {} },
        { $group: { _id: "$clientStatus.name", count: { $sum: 1 } } },
      ])
      .then((shipments) => {
        resolve({
          second: {
            data: shipments,
            success: true,
            total: shipments.length,
          }
        })
        reject(new Error('second error'));
      })
  });
  const thirdBlock = new Promise((resolve, reject) => {
    Shipment
      // clientInvoice: { $exist: false },
      .aggregate([
        { $match: {} },
        { $group: { _id: "$clientStatus.name", count: { $sum: 1 } } },
      ])
      .then((shipments) => {
        resolve({
          third: {
            data: shipments,
            success: true,
            total: shipments.length,
          }
        })
        reject(new Error('third error'));

      })
  });
  const fourthBlock = new Promise((resolve, reject) => {
    Shipment
      .aggregate([
        { $match: {} },
        { $group: { _id: "$clientStatus.name", count: { $sum: 1 } } },
      ])
      .then((shipments) => {
        resolve({
          fourth: {
            data: shipments,
            success: true,
            total: shipments.length,
          }
        })
        reject(new Error('fourth error'));

      })
  });


  Promise.all([firstBlock, secondBlock, thirdBlock, fourthBlock]).then(values => {
    console.log(values);
    res.json({
      data: values,
      success: true
    })
  }
  ).catch(err => {
    res.json({
      success: false
    })
  }
  );
}
exports.listGlobal = (req, res) => {
  const query = prepareQuery(req?.query?.shipment_no, req?.query?.customerMobile,
    req?.query?.toGovernment, req?.query?.clientStatus, req?.query?.driverStatus,
    req?.query?.branchStatus, req?.query?.driver, req?.query?.note, req?.query?.senderBranchPrice,
    req?.query?.clientDeliveryPrice, req?.query?.driverDeliveryPrice, req?.query?.fromBranch, req?.query?.toBranch,
    req?.query?.toTown, req?.query?.store, req?.query?.clientInvoice, req?.query?.branchInvoice,
    req?.query?.driverInvoice, req?.query?.createdAt, req?.query?.branchDeliveryPrice, req?.query?.createdBy);
  resultsWithPromises(query, res)
};
