const formidable = require('formidable');
const _ = require('lodash');
const Invoice = require('../models/invoice');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.invoiceById = (req, res, next, id) => {
  Invoice.findById(id).exec((err, invoice) => {
    if (err || !invoice) {
      return res.status(400).json({
        error: 'invoice not found',
      });
    }
    req.invoice = invoice;
    next();
  });
};

exports.create = (req, res) => {
  const invoice = new Invoice(req.body);
  invoice.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  return res.json(req.invoice);
};

exports.update = (req, res) => {
  const invoice = req.invoice;
  invoice.name = req.body.name;
  invoice.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  const invoice = req.invoice;
  invoice.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'invoice deleted',
    });
  });
};
exports.list = (req, res) => {
  Invoice.find( )
      .exec((err, invoices) => {
          if (err) {
              return res.status(400).json({
                  error: "invoices not found"
              });
          }
          res.json(invoices);
      });
};
