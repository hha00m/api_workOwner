const Government = require('../models/government');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.governmentById = (req, res, next, id) => {
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
  const government = new Government(req.body);
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
    $set: { name: req.body.name, note: req.body.note }
  }).then((result) => { res.json(result) })
    .catch((err) => {
      return res.status(400).json({ error: errorHandler(err) })
    })
};

exports.remove = (req, res) => {
  Government.deleteOne({ _id: req.body.key[0] }).then((result) => {
    res.json({
      message: 'government deleted successfully',
    });
  }).catch((err) => {
    return res.status(400).json({
      error: errorHandler(err),
    });
  })
};

exports.list = (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  const current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0
  const q = req.query.name ? { $text: { $search: req.query.name } } :
    req.query.note ? { $text: { $search: req.query.note } } : {}

  Government
    .find(q)
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
