const NewJobTitle = require('../models/newJobTitle');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.newJobTitleById = (req, res, next, id) => {
  NewJobTitle.findById(id).exec((err, newJobTitle) => {
    if (err || !newJobTitle) {
      return res.status(400).json({
        error: 'المدينه غير موجودة يرجى اضافتها',
      });
    }
    req.newJobTitle = newJobTitle;
    next();
  });
};

exports.create = (req, res) => {
  const newJobTitle = new NewJobTitle(req.body);
  newJobTitle.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  return res.json(req.newJobTitle);
};

exports.update = (req, res) => {
  const newJobTitle = req.newJobTitle;
  newJobTitle.name = req.body.name;
  newJobTitle.note = req.body.note;
  newJobTitle.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  let newJobTitle = req.newJobTitle;
  newJobTitle.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'newJobTitle deleted successfully',
    });
  });
};

exports.list = (req, res) => {
  //---------------------sort live--------------------------
  let sort = req.query.sorter;
  let sorter = '_id';
  let order = 1;
  try {
    let str = sort.split('_');
    sorter = str[0] ? str[0] : '_id';
    order = str[1] == 'ascend' ? 1 : -1;
  } catch (e) {
    console.log(e);
  }
  //-----------------------find Item---------------------------
  let fName = req.query.name ? req.query.name : '';

  //------------------------------------------------------
  var query = {};
  if (fName !== '') {
    query['$and'] = [];
    query['$and'].push({ name: { $regex: '.*' + fName + '.*' } });
  }
  let pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  let current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0

  const total = NewJobTitle.find(query).count;
  NewJobTitle.find(query)
    .sort([[sorter, order]])
    .skip(current * pageSize)
    .limit(pageSize)
    .exec((err, cities) => {
      if (err) {
        return res.status(400).json({
          error: 'newJobTitle not found',
        });
      }

      res.json({
        data: cities,
        total,
        success: true,
        pageSize,
        current,
      });
    });
};
