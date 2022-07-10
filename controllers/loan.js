const _ = require('lodash');
const Loan = require('../models/loan');
const { errorHandler } = require('../helpers/dbErrorHandler');
const { default: mongoose } = require('mongoose');

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

const findBalance = async (cleint) => {
  try {
    return await Loan
      .find({ 'client._id': cleint })
      .sort({ createdAt: -1 })
      .then((lo) => {
        if (lo.length > 0) {
          return lo[0].balance;
        }
        return 0;
      }).catch((err) => {
        return 0;
      })
  } catch (err) {
    return 0;
  }
}
const saveData = async (req, res) => {
  try {
    const amountMain = (req.body?.isLoan ? (-1 * req.body?.amount) : req.body?.amount);
    const balance = await findBalance(req.body?.client);

    const loan = new Loan({
      balance: balance + amountMain,
      amount: req.body?.amount,
      note: req.body?.note,
      client: req.body?.clientObj,
      isLoan: req.body?.isLoan,
      creator: req.body?.creator
    });
    loan.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
          success: false
        });
      }
      res.json({ success: true, data });
    });
  } catch (e) {
    return res.status(400).json({ error: errorHandler(e), success: false })
  }
}


exports.create = (req, res) => {
  saveData(req, res);
};
exports.remove = (req, res) => {
  Loan.deleteMany({ '_id': { '$in': req.body.keys } })
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
  Loan.update({ _id: req.body.id }, {
    $set: {
      amount: req.body?.amount,
      note: req.body?.note,
      isLoan: req.body?.isLoan,
      client: req.body?.client,
    },
  }).then((result) => { res.json({ result, success: true }) })
    .catch((err) => {
      return res.status(400).json({ error: errorHandler(err), success: false })
    })


};

const prepareQuery = (
  amount,
  client,
  isLoan,
  createdAt
) => {
  let query = {};
  amount ? query['amount'] = amount : '';
  client ? query['client._id'] = (client) : '';
  isLoan ? query['isLoan'] = isLoan : '';
  createdAt ? query['createdAt'] = { $gte: createdAt } : '';
  return query;
}

exports.list = (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  const current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0
  const query = prepareQuery(
    req?.query?.amount,
    req?.query?.client,
    req?.query?.isLoan,
    req?.query?.createdAt);
  Loan
    .find(query)
    .populate('client', 'amount _id')
    // .skip(pageSize * current)
    // .limit(pageSize)
    .sort({ createdAt: -1 })
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
