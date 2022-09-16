const Government = require('../../models/financeModels/ownersEquity');
const { errorHandler } = require('../../helpers/dbErrorHandler');
const Entry = require('../../models/financeModels/entry');
const JournalEntry = require('../../models/financeModels/journalEntry');

exports.ownersEquityById = (req, res, next, id) => {
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
exports.create = (req, res) => {
  const s = {
    name: req.body?.name,
    note: req.body?.note,
    parent: req.body?.typeObject?.parent,
    type: req.body?.typeObject
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
      balance: req.body.balance,
      parent: req.body.typeObject?.parent,
      type: req.body?.typeObject
    },
  }).then((result) => { res.json(result) })
    .catch((err) => {
      return res.status(400).json({ error: errorHandler(err) })
    })
};
exports.increaseBalanceOwnersEquity = (id, value) => {
  try {

    Government.update({ _id: id }, {
      $inc: {
        balance: value,
      },
    }).catch((err) => {
      console.log(err)
    })
  } catch (e) {
    console.log({
      message: 'type deleted unsuccessfully',
    })
  };
};
const createEntry = (s, res) => {
  try {
    const entry = new Entry(s)
    entry.save((err, data) => {
      if (err) {
        console.log({
          error: errorHandler(err),
        });
      }
      Government.update({ _id: s.ownersEquity._id }, {
        $inc: {
          balance: s.money,
        },
      }).catch((err) => {
        console.log(err)
      }).then((ok) =>
        res.json({
          message: 'type deleted successfully',
        })
      )
    });
  } catch (e) {
    res.json({
      message: 'type deleted unsuccessfully',
    });
  }
}
exports.updateMoney = async (req, res) => {
  const number = await Entry.find({}).sort({ _id: -1 }).limit(1)

  createEntry({
    entryNumber: number[0] ?
      number[0]?.entryNumber > 550000 ?
        number[0]?.entryNumber + 1 : 550000 : 550000,
    isPayable: false,
    money: req.body?.balance,
    ownersEquity: req.body?.typeObject
  }, res)
};
exports.remove = (req, res) => {
  Government.deleteOne({ _id: req.body.keys[0] }).then((result) => {
    res.json({
      message: 'type deleted successfully',
    });
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
