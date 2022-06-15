const _ = require('lodash');
const Store = require('../models/store');
const Client = require('../models/client');
const { errorHandler } = require('../helpers/dbErrorHandler');
const { default: mongoose } = require('mongoose');

exports.storeById = (req, res, next, id) => {
  Store.findById(id).exec((err, store) => {
    if (err || !store) {
      return res.status(400).json({
        error: 'store not found',
      });
    }
    console.log('store found ...');
    req.store = store;
    next();
  });
};

exports.read = (req, res) => {
  req.store.photo = undefined;
  return res.json(req.store);
};

exports.create = async (req, res) => {
  const client = await Client.findById(mongoose.Types.ObjectId(req.body.client));
  const store = new Store({
    name: req.body.name,
    note: req.body.note,
    client: client
  });
  store.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
        success: false,
      });
    }
    res.json({ success: true, data });
  });
};
exports.remove = (req, res) => {
  Store.deleteMany({ '_id': { '$in': req.body.keys } })
    .then((result) => {
      res.json({
        success: true,
        message: 'store deleted successfully',
      });
    }).catch((err) => {
      return res.status(400).json({
        error: errorHandler(err),
        success: false,
      });
    })
};
exports.update = (req, res) => {
  Store.update({ _id: req.body.id }, {
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
const prepareQuery = (
  name,
  client,
  createdAt
) => {
  let query = {};
  name ? query['name'] = name : '';
  client ? query['client'] = mongoose.Types.ObjectI(client) : '';
  createdAt ? query['createdAt'] = { $gte: (createdAt[0]), $lt: (createdAt[1]) } : '';
  return query;
}

exports.list = (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  const current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0
  const query = prepareQuery(
    req?.query?.name,
    req?.query?.client,
    req?.query?.createdAt);
  Store
    .find(query)
    .populate('client', 'name _id')
    // .skip(pageSize * current)
    // .limit(pageSize)
    .sort({ name: 1 })
    .then((stores) => {
      res.json({
        data: stores,
        success: true,
        current,
        pageSize,
        total: stores.length,
      });
    }).catch((err) => {
      return res.status(400).json({
        success: false,
        error: 'store not found',
      })
    })

};
