const _ = require('lodash');
const Shipment = require('../models/shipment');

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

resultsWithPromises = (query, res) => {
  var today = new Date();
  today.setDate(today.getDate() - 1);

  const todayBlock = new Promise((resolve, reject) => {
    Shipment
      .aggregate([
        { $match: { createdAt: { $gte: (today) } } },
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



//-------------========{clients monitor page}=========-----------------=============
const prepareQueryClients = (client, government,
  createdAt
) => {
  let query = {};

  client ? query['store.client._id'] = client : '';
  government ? query['store.client.branch._id'] = government : '';
  createdAt ? query['createdAt'] = { graterThan: new Date(createdAt[0]), lessThan: new Date(createdAt[1]) } : '';
  return query;
}
const findElement = (array, element) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].store === element) {
      return i;
    }
  }
  return -1;
}
resultsWithPromisesClients = (query, res) => {

  const clientsBlock = new Promise((resolve, reject) => {
    Shipment
      // 
      .aggregate([
        {
          $match: {
            clientInvoice: { $eq: null },
            // createdAt: { $gte: query.createdAt.graterThan, $lt: query.createdAt.lessThan }
          }
        },
        {
          $group: {
            _id: {
              store: "$store.name",

              clientStatus: "$clientStatus.name",
            },

            totalAmount: { $sum: "$newPrice" },
            shipments: { $sum: 1 }
          }
        },

      ])
      .then((shipments) => {
        let stores = []
        let obj;
        let index = -1;
        shipments.map((shipment) => {
          obj = {
            store: "",
            delevred: 0,
            pending: 0,
            rejected: 0,
            partial: 0,
            wallet: 0,
          }
          index = findElement(stores, shipment._id.store);

          if (stores.length > 0 && index > -1) {
            if (shipment._id.clientStatus === 'واصل') {
              stores[index].delevred = shipment.shipments
              stores[index].wallet += shipment.totalAmount
            } else
              if (shipment._id.clientStatus === 'مع المندوب') {
                stores[index].pending = shipment.shipments
              } else
                if (shipment._id.clientStatus === 'راجع كلي') {
                  stores[index].rejected = shipment.shipments
                } else
                  if (shipment._id.clientStatus === 'راجع جزئي') {
                    stores[index].partial = shipment.shipments
                    stores[index].wallet += shipment.totalAmount
                  }

          } else {
            obj.store = shipment._id.store
            obj.delevred = shipment._id.clientStatus === 'واصل' ? shipment.shipments : 0
            obj.pending = shipment._id.clientStatus === 'مع المندوب' ? shipment.shipments : 0
            obj.reject = shipment._id.clientStatus === 'راجع كلي' ? shipment.shipments : 0
            obj.partial = shipment._id.clientStatus === 'راجع جزئي' ? shipment.shipments : 0
            obj.wallet = shipment._id.clientStatus === 'واصل' ? shipment.totalAmount : 0
            stores.push(obj)
          }
        })


        resolve({
          clientsBlock: {
            data: stores,
            success: true,
            total: stores.length,
          }
        })
        reject(new Error('second error'));
      })
  });


  Promise.all([clientsBlock]).then(values => {
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
exports.listClients = (req, res) => {
  const query = prepareQueryClients(req?.query?.shipment_no, req?.query?.customerMobile,
    req?.query?.client,
    req?.query?.government,
    req?.query?.createdAt
  );
  try {
    resultsWithPromisesClients(query, res)
  } catch (err) {
    res.json({
      success: false,
      error: err
    })
  }

};

//-------------========{drivers monitor page}=========-----------------=============
const prepareQueryDrivers = (driver, government,
  createdAt
) => {
  let query = {};

  driver ? query['driver._id'] = driver : '';
  government ? query['driver.branch._id'] = government : '';
  createdAt ? query['createdAt'] = { graterThan: new Date(createdAt[0]), lessThan: new Date(createdAt[1]) } : '';
  return query;
}
const findElement_Driver = (array, element) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].driver === element) {
      return i;
    }
  }
  return -1;
}
resultsWithPromisesDrivers = (query, res) => {

  const driversBlock = new Promise((resolve, reject) => {
    Shipment
      .aggregate([
        {
          $match: {
            driverInvoice: { $eq: null },
            // createdAt: { $gte: query.createdAt.graterThan, $lt: query.createdAt.lessThan }
          }
        },
        {
          $group: {
            _id: {
              driver: "$driver.name",
              clientStatus: "$clientStatus.name",
            },

            totalAmount: { $sum: "$newPrice" },
            shipments: { $sum: 1 }
          }
        },

      ])
      .then((shipments) => {
        let drivers = []
        let obj;
        let index = -1;
        shipments.map((shipment) => {
          obj = {
            driver: "",
            delevred: 0,
            pending: 0,
            rejected: 0,
            partial: 0,
            wallet: 0,
          }
          index = findElement_Driver(drivers, shipment._id.driver);

          if (drivers.length > 0 && index > -1) {
            if (shipment._id.clientStatus === 'واصل') {
              drivers[index].delevred = shipment.shipments
              drivers[index].wallet += shipment.totalAmount
            } else
              if (shipment._id.clientStatus === 'مع المندوب') {
                drivers[index].pending = shipment.shipments
              } else
                if (shipment._id.clientStatus === 'راجع كلي') {
                  drivers[index].rejected = shipment.shipments
                } else
                  if (shipment._id.clientStatus === 'راجع جزئي') {
                    drivers[index].partial = shipment.shipments
                    drivers[index].wallet += shipment.totalAmount
                  }

          } else {
            obj.driver = shipment._id.driver
            obj.delevred = shipment._id.clientStatus === 'واصل' ? shipment.shipments : 0
            obj.pending = shipment._id.clientStatus === 'مع المندوب' ? shipment.shipments : 0
            obj.reject = shipment._id.clientStatus === 'راجع كلي' ? shipment.shipments : 0
            obj.partial = shipment._id.clientStatus === 'راجع جزئي' ? shipment.shipments : 0
            obj.wallet = shipment._id.clientStatus === 'واصل' ? shipment.totalAmount : 0
            drivers.push(obj)
          }
        })


        resolve({
          driversBlock: {
            data: drivers,
            success: true,
            total: drivers.length,
          }
        })
        reject(new Error('second error'));
      })
  });


  Promise.all([driversBlock]).then(values => {
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
exports.listDrivers = (req, res) => {
  const query = prepareQueryDrivers(req?.query?.shipment_no, req?.query?.customerMobile,
    req?.query?.driver,
    req?.query?.government,
    req?.query?.createdAt
  );
  try {
    resultsWithPromisesDrivers(query, res)
  } catch (err) {
    res.json({
      success: false,
      error: err
    })
  }

};


//-------------========{branchs monitor page}=========-----------------=============
const prepareQueryBranchs = (branch, government,
  createdAt
) => {
  let query = {};

  branch ? query['toBranch._id'] = branch : '';
  // government ? query['branch.branch._id'] = government : '';
  createdAt ? query['createdAt'] = { graterThan: new Date(createdAt[0]), lessThan: new Date(createdAt[1]) } : '';
  return query;
}
const findElement_Branchs = (array, element) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].branch === element) {
      return i;
    }
  }
  return -1;
}
resultsWithPromisesBranchs = (query, res) => {

  const branchsBlock = new Promise((resolve, reject) => {
    Shipment
      .aggregate([
        {
          $match: {
            branchInvoice: { $eq: null },
            // createdAt: { $gte: query.createdAt.graterThan, $lt: query.createdAt.lessThan }
          }
        },
        {
          $group: {
            _id: {
              branch: "$toBranch.name",
              clientStatus: "$clientStatus.name",
            },

            totalAmount: { $sum: "$newPrice" },
            shipments: { $sum: 1 }
          }
        },

      ])
      .then((shipments) => {
        let branchs = []
        let obj;
        let index = -1;
        shipments.map((shipment) => {
          obj = {
            branch: "",
            delevred: 0,
            pending: 0,
            rejected: 0,
            partial: 0,
            wallet: 0,
          }
          index = findElement_Branchs(branchs, shipment._id.branch);

          if (branchs.length > 0 && index > -1) {
            if (shipment._id.clientStatus === 'واصل') {
              branchs[index].delevred = shipment.shipments
              branchs[index].wallet += shipment.totalAmount
            } else
              if (shipment._id.clientStatus === 'مع المندوب') {
                branchs[index].pending = shipment.shipments
              } else
                if (shipment._id.clientStatus === 'راجع كلي') {
                  branchs[index].rejected = shipment.shipments
                } else
                  if (shipment._id.clientStatus === 'راجع جزئي') {
                    branchs[index].partial = shipment.shipments
                    branchs[index].wallet += shipment.totalAmount
                  }

          } else {
            obj.branch = shipment._id.branch
            obj.delevred = shipment._id.clientStatus === 'واصل' ? shipment.shipments : 0
            obj.pending = shipment._id.clientStatus === 'مع المندوب' ? shipment.shipments : 0
            obj.reject = shipment._id.clientStatus === 'راجع كلي' ? shipment.shipments : 0
            obj.partial = shipment._id.clientStatus === 'راجع جزئي' ? shipment.shipments : 0
            obj.wallet = shipment._id.clientStatus === 'واصل' ? shipment.totalAmount : 0
            branchs.push(obj)
          }
        })


        resolve({
          branchsBlock: {
            data: branchs,
            success: true,
            total: branchs.length,
          }
        })
        reject(new Error('second error'));
      })
  });


  Promise.all([branchsBlock]).then(values => {
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
exports.listBranchs = (req, res) => {
  const query = prepareQueryBranchs(
    req?.query?.branch,
    req?.query?.government,
    req?.query?.createdAt
  );
  try {
    resultsWithPromisesBranchs(query, res)
  } catch (err) {
    res.json({
      success: false,
      error: err
    })
  }

};
