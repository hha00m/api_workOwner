const Government = require('../../models/financeModels/journalEntry');
const { errorHandler } = require('../../helpers/dbErrorHandler');
const Entry = require('../../models/financeModels/entry');
const { increaseBalanceExpenses } = require('./expenses');
const { increaseBalanceAssets } = require('./assets');
const { increaseBalanceLLiabillities } = require('./liabilities');
const { increaseBalanceOwnersEquity } = require('./ownersEquity');
const { increaseBalanceRevennue } = require('./revenue');



exports.journalEntryById = (req, res, next, id) => {
  Government.findById(id).exec((err, government) => {
    if (err || !government) {
      return res.status(400).json({
        error: 'المدينه غير موجودة يرجى اضافتها',
      });
    }
    req.government = government;
    next();
  });
};

const transaction = (obj, isPayable) => {
  if (!isPayable) {
    obj?.assets?._id ?
      increaseBalanceAssets(obj?.assets?._id, obj?.money) :
      obj?.expenses?._id ?
        increaseBalanceExpenses(obj?.expenses?._id, obj?.money) :
        obj?.liabilities?._id ?
          increaseBalanceLLiabillities(obj?.liabilities?._id, obj?.money) :
          obj?.ownersEquity?._id ?
            increaseBalanceOwnersEquity(obj?.ownersEquity?._id, obj?.money) :
            increaseBalanceRevennue(obj?.revennue?._id, obj?.money)

  }
  else {
    obj?.assets?._id ?
      increaseBalanceAssets(obj?.assets?._id, -1 * obj?.money) :
      obj?.expenses?._id ?
        increaseBalanceExpenses(obj?.expenses?._id, -1 * obj?.money) :
        obj?.liabilities?._id ?
          increaseBalanceLLiabillities(obj?.liabilities?._id, -1 * obj?.money) :
          obj?.ownersEquity?._id ?
            increaseBalanceOwnersEquity(obj?.ownersEquity?._id, -1 * obj?.money) :
            increaseBalanceRevennue(obj?.revennue?._id, -1 * obj?.money)

  }


};


const createEntry = (rank, d) => {
  const py = d;
  py["entryNumber"] = rank;
  const entry = new Entry(py)
  entry.save((err, data) => {
    if (err) {
      console.log({
        error: errorHandler(err),
      });
    }
    py.isPayable ? transaction(py, py.isPayable) : transaction(py, py.isPayable)
  });
  return entry;
}


exports.create = async (req, res) => {
  const number = await Government.find({}).sort({ _id: -1 }).limit(1)
  const rank = number[0] ? number[0]?.entryNumber + 1 : 1
  const receivable = await createEntry(rank, req.body.receivable, res)
  const payable = await createEntry(rank, req.body.payable, res)

  const s = {
    receivable: receivable,
    payable: payable,
    // createdBy: "",
    note: req.body.note,
    entryNumber: rank
  }

  const government = new Government(s);
  government.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  return res.json(req.government);
};

exports.update = (req, res) => {

  Government.update({ _id: req.body.id }, {
    $set: {
      name: req.body.name, note: req.body.note,
      type: req.body.typeObject,
      balance: req.body.balance
    },
  }).then((result) => { res.json(result) })
    .catch((err) => {
      return res.status(400).json({ error: errorHandler(err) })
    })
};

exports.remove = (req, res) => {
  Government.deleteOne({ entryNumber: req.body.keys[0].ids }).then((result) => {
    Entry.deleteMany({ entryNumber: req.body.keys[0].ids }).then((result) => {
      res.json({
        message: 'type deleted successfully',
      });
      req.body.keys[0].payable.isPayable ?
        transaction(req.body.keys[0].payable, !req.body.keys[0].payable.isPayable) :
        transaction(req.body.keys[0].receivable, !req.body.keys[0].receivable.isPayable)
    }).catch((err) => {
      return res.status(400).json({
        error: errorHandler(err),
      });
    })
  }).catch((err) => {
    return res.status(400).json({
      error: errorHandler(err),
    });
  })
};

exports.list = (req, res) => {
  const pageSize = 20; //page size which is limeit
  const current = 0; // return currnet page else 0


  Government
    .find()
    // .skip(pageSize * current)
    // .limit(pageSize)
    .sort({ name: 1 })
    .then((governments) => {
      res.json({
        data: governments,
        success: true,
        current,
        pageSize,
        total: governments.length,
      });
    }).catch((err) => {
      return res.status(400).json({
        success: false,
        error: 'government not found',
      })
    })

};
