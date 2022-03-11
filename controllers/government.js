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

  Government.update({ _id: req.body._id }, {
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


  Government
    .find()
    .skip(pageSize * current)
    .limit(pageSize)
    .sort({ name: 1 })
    .then((governments) => {
      res.json({
        data: governments,
        success: true,
        pageSize,
        current,
      });
    }).catch((err) => {
      return res.status(400).json({
        error: 'government not found',
      })
    })



  // //---------------------sort live--------------------------
  // let sort = req.query.sorter;
  // let sorter = '_id';
  // let order = 1;
  // try {
  //   let str = sort.split('_');
  //   sorter = str[0] ? str[0] : '_id';
  //   order = str[1] == 'ascend' ? 1 : -1;
  // } catch (e) {
  //   // console.log(e);
  // }

  // let name = req.query.name ? req.query.name : '';

  // var query = {};
  // if (name !== '') {
  //   query['$and'] = [];
  //   query['$and'].push({ name: { $regex: '.*' + name + '.*' } });
  // }
  // let pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  // let current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0

  // const total = Government.find(query).count;
  // Government.find(query)
  //   .sort([[sorter, order]])
  //   .exec((err, governments) => {
  //     if (err) {
  //       return res.status(400).json({
  //         error: 'government not found',
  //       });
  //     }

  //     res.json({
  //       data: governments,
  //       total: total.length,
  //       success: true,
  //       pageSize,
  //       current,
  //     });
  //   });
};
