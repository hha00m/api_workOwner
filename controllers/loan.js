const _ = require('lodash');
const Loan = require('../models/loan');
const { errorHandler } = require('../helpers/dbErrorHandler');
const { clientById } = require('./client');

exports.loanById = (req, res, next, id) => {
  Loan.findById(id).exec((err, loan) => {
    if (err || !loan) {
      return res.status(400).json({
        error: 'loan not found',
      });
    }
    console.log('loan found ...');
    req.loan = loan;
    next();
  });
};

exports.read = (req, res) => {
  req.loan.photo = undefined;
  return res.json(req.loan);
};

exports.create = (req, res) => {
  const s = { name: req.body.name, note: req.body.note, client: req.body.clientObj }
  const loan = new Loan(s);
  loan.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ success: true, data });
  });
};
exports.remove = (req, res) => {
  Loan.deleteOne({ _id: req.body.key[0] }).then((result) => {
    res.json({
      success: true,
      message: 'loan deleted successfully',
    });
  }).catch((err) => {
    return res.status(400).json({
      error: errorHandler(err),
    });
  })
};
exports.update = (req, res) => {
  Loan.update({ _id: req.body.id }, {
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

  Loan
    .find(q)
    .populate('client', 'name _id')
    // .skip(pageSize * current)
    // .limit(pageSize)
    .sort({ name: 1 })
    .then((loans) => {
      res.json({
        data: loans,
        success: true,
        current,
        pageSize,
        total: loans.length,
      });
    }).catch((err) => {
      return res.status(400).json({
        success: false,
        error: 'loan not found',
      })
    })

};
