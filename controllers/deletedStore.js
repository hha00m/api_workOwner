const _ = require('lodash');
const Store = require('../models/deletedStore');
const { errorHandler } = require('../helpers/dbErrorHandler');

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

exports.create = (req, res) => {
  const store = new Store(req.body);
  store.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ success: true, data });
  });
};
exports.remove = (req, res) => {
  Store.deleteOne({ _id: req.body.key[0] }).then((result) => {
    res.json({
      success: true,
      message: 'store deleted successfully',
    });
  }).catch((err) => {
    return res.status(400).json({
      error: errorHandler(err),
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


exports.list = (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  const current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0
  const q = req.query.name ? { $text: { $search: req.query.name } } :
    req.query.note ? { $text: { $search: req.query.note } } : req.query.government ? { $text: { $search: req.query.government } } : {}

  Store
    .find(q)
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
