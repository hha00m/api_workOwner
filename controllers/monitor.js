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
  createdAt ? query['createdAt'] = { graterThan: new Date(createdAt[0]), lessThan: new Date(createdAt[1]) } : '';
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
  var today = new Date();
  // var queriedDate=new Date()

  const todayBlock = new Promise((resolve, reject) => {

    Shipment
      .aggregate([
        { $match: { createdAt: { $gt: (today) } } },
        {
          $group: {
            _id: "$clientStatus.name",
            totalDelivery: { $sum: "$clientDeliveryPrice" },
            totalAmount: { $sum: "$newPrice" },
            count: { $sum: 1 }
          }
        },
      ])
      .then((shipments) => {
        let totalAmount = 0, totalDelivery = 0;
        let totalCount = 0;
        shipments.map((shipment) => {
          totalAmount = totalAmount + shipment.totalAmount;
          totalCount = totalCount + shipment.count;
          totalDelivery = totalDelivery + shipment.totalDelivery;
        })
        resolve({
          todayBlock: {
            data: shipments,
            totalAmount,
            totalCount,
            totalDelivery,
            success: true,
            total: shipments.length,
          }
        })
        reject(new Error('first block error'));

      })
  });
  const driversBlock = new Promise((resolve, reject) => {
    Shipment
      // 
      .aggregate([
        {
          $match: {
            driverInvoice: { $eq: null },
            createdAt: { $gte: query.createdAt.graterThan, $lt: query.createdAt.lessThan }
          }
        },
        {
          $group: {
            _id: "$clientStatus.name",
            totalAmount: { $sum: "$newPrice" },
            count: { $sum: 1 }
          }
        },
      ])
      .then((shipments) => {
        let totalAmount = 0;
        let totalCount = 0;
        shipments.map((shipment) => {
          totalAmount = totalAmount + shipment.totalAmount;
          totalCount = totalCount + shipment.count;
        })
        resolve({
          driversBlock: {
            data: shipments,
            totalAmount,
            totalCount,
            success: true,
            total: shipments.length,
          }
        })
        reject(new Error('second error'));
      })
  });
  const branchsBlock = new Promise((resolve, reject) => {
    Shipment
      // 
      .aggregate([
        {
          $match: {
            branchInvoice: { $eq: null },
            createdAt: { $gte: query.createdAt.graterThan, $lt: query.createdAt.lessThan }
          }
        },
        {
          $group: {
            _id: "$clientStatus.name",
            totalAmount: { $sum: "$newPrice" },
            count: { $sum: 1 }
          }
        },
      ])
      .then((shipments) => {
        let totalAmount = 0;
        let totalCount = 0;
        shipments.map((shipment) => {
          totalAmount = totalAmount + shipment.totalAmount;
          totalCount = totalCount + shipment.count;
        })
        resolve({
          branchsBlock: {
            data: shipments,
            totalAmount,
            totalCount,
            success: true,
            total: shipments.length,
          }
        })
        reject(new Error('third error'));
      })
  });
  const companyBlock = new Promise((resolve, reject) => {
    Shipment
      .aggregate([
        {
          $match: {
            clientInvoice: { $eq: null },
            createdAt: { $gte: query.createdAt.graterThan, $lt: query.createdAt.lessThan }
          }
        },
        {
          $group: {
            _id: "$clientStatus.name",
            totalAmount: { $sum: "$newPrice" },
            count: { $sum: 1 }
          }
        },
      ])
      .then((shipments) => {
        let totalAmount = 0;
        let totalCount = 0;
        shipments.map((shipment) => {
          totalAmount = totalAmount + shipment.totalAmount;
          totalCount = totalCount + shipment.count;
        })
        resolve({
          companyBlock: {
            data: shipments,
            totalAmount,
            totalCount,
            success: true,
            total: shipments.length,
          }
        })
        reject(new Error('fourth error'));

      })
  });

  const driverRankBest = new Promise((resolve, reject) => {
    Shipment
      .aggregate([
        {
          $match: {
            createdAt: { $gte: query.createdAt.graterThan, $lt: query.createdAt.lessThan }
          }
        },
        {
          $group: {
            _id: "$driver.name",
            count: { $sum: 1 }
          }
        },
      ])
      .sort({ count: -1 })
      .limit(6)
      .then((shipments) => {
        resolve({
          driverRankBest: {
            data: shipments,
            success: true,
            total: shipments.length,
          }
        })
        reject(new Error('driverRankBest error'));

      })
  });
  const driverRankWorst = new Promise((resolve, reject) => {
    Shipment
      .aggregate([
        {
          $match: {
            createdAt: { $gte: query.createdAt.graterThan, $lt: query.createdAt.lessThan }
          }
        },
        {
          $group: {
            _id: "$driver.name",
            count: { $sum: 1 }
          }
        },
      ])
      .sort({ count: 1 })
      .limit(6)
      .then((shipments) => {
        resolve({
          driverRankWorst: {
            data: shipments,
            success: true,
            total: shipments.length,
          }
        })
        reject(new Error('driverRankworst error'));

      })
  });


  const branchRankBest = new Promise((resolve, reject) => {
    Shipment
      .aggregate([
        {
          $match: {
            createdAt: { $gte: query.createdAt.graterThan, $lt: query.createdAt.lessThan }
          }
        }, {
          $group: {
            _id: "$toBranch.name",
            count: { $sum: 1 }
          }
        },
      ])
      .sort({ count: -1 })
      .limit(6)
      .then((shipments) => {
        resolve({
          branchRankBest: {
            data: shipments,
            success: true,
            total: shipments.length,
          }
        })
        reject(new Error('branchRankBest error'));

      })
  });
  const branchRankWorst = new Promise((resolve, reject) => {
    Shipment
      .aggregate([
        {
          $match: {
            createdAt: { $gte: query.createdAt.graterThan, $lt: query.createdAt.lessThan }
          }
        }, {
          $group: {
            _id: "$toBranch.name",
            count: { $sum: 1 }
          }
        },
      ])
      .sort({ count: 1 })
      .limit(6)
      .then((shipments) => {
        resolve({
          branchRankWorst: {
            data: shipments,
            success: true,
            total: shipments.length,
          }
        })
        reject(new Error('branchRankWorst error'));

      })
  });


  Promise.all([todayBlock, driversBlock, branchsBlock, companyBlock, driverRankBest, driverRankWorst, branchRankBest, branchRankWorst]).then(values => {
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
  try {
    resultsWithPromises(query, res)
  } catch (err) {
    res.json({
      success: false,
      error: err
    })
  }

};
