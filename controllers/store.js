const formidable = require("formidable");
const _ = require("lodash");
const Store = require("../models/store");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.storeById = (req, res, next, id) => {
  Store.findById(id).exec((err, store) => {
        if (err || !store) {
            return res.status(400).json({
                error: "Store not found"
            });
        }
        req.store = store;
        next();
    });
};

exports.read = (req, res) => {
    req.store.photo = undefined;
    return res.json(req.s);
};


exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
      if (err) {
          return res.status(400).json({
              error: "Image could not be uploaded"
          });
      }
      // check for all fields
      const {
          name,
          client,

      } = fields;

      if (
          !name ||
          !client
      ) {
          return res.status(400).json({
              error: "All fields are required"
          });
      }

      let store = new Store(fields);



      store.save((err, result) => {
          if (err) {
              return res.status(400).json({
                  error: errorHandler(err)
              });
          }
          res.json(result);
      });
  });
};



exports.remove = (req, res) => {
    let store = req.store;
    store.remove((err, deletedStore) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "store deleted successfully"
        });
    });
};
exports.update = (req, res) => {
  const store = req.store;
  store.name = req.body.name;
  store.save((err, data) => {
      if (err) {
          return res.status(400).json({
              error: errorHandler(err)
          });
      }
      res.json(data);
  });
};

// List of prices for certain client
exports.list = (req, res) => {
//{client: req.store.client}
  Store.find().exec((err, store) => {
            if (err) {
                return res.status(400).json({
                    error: "store not found"
                });
            }
            res.json(store);
        });
};

