const formidable = require("formidable");
const _ = require("lodash");
const Receipt = require("../models/receipt");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.receiptById = (req, res, next, id) => {
  Receipt.findById(id).exec((err, receipt) => {
        if (err || !receipt) {
            return res.status(400).json({
                error: "receipt not found"
            });
        }
        req.receipt = receipt;
        next();
    });
};


exports.create = (req, res) => {
  const receipt = new Receipt(req.body);
  receipt.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  return res.json(req.receipt);
};

exports.update = (req, res) => {
  const receipt = req.receipt;
  receipt.name = req.body.name;
  receipt.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  const receipt = req.receipt;
  receipt.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'receipt deleted',
    });
  });
};




exports.list = (req, res) => {
  Receipt.find( )
      .exec((err, receipts) => {
          if (err) {
              return res.status(400).json({
                  error: "receipts not found"
              });
          }
          res.json(receipts);
      });
};
