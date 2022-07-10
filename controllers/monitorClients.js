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
            // clientInvoice: { $eq: null },
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
