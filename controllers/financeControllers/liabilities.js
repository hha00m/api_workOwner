const Government = require('../../models/financeModels/liabilities');
const { errorHandler } = require('../../helpers/dbErrorHandler');

exports.liabilitiesById = (req, res, next, id) => {
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
    name: req.body.name,
    note: req.body.note,
    type: req.body.typeObject,
    parent: req.body.typeObject?.parent
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
      name: req.body.name,
      parent: req.body.typeObject?.parent,
      note: req.body.note,
      type: req.body.typeObject,
      balance: req.body.balance
    },
  }).then((result) => { res.json(result) })
    .catch((err) => {
      return res.status(400).json({ error: errorHandler(err) })
    })
};
exports.increaseBalanceLLiabillities = (id, value) => {
  Government.update({ _id: id }, {
    $inc: {
      balance: value,
    },
  }).catch((err) => {
    console.log(err)
  })
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
