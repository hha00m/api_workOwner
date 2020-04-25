const JobTitle = require('../models/jobTitle');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.jobTitleById = (req, res, next, id) => {
  JobTitle.findById(id).exec((err, jobTitle) => {
    if (err || !jobTitle) {
      return res.status(400).json({
        error: 'المدينه غير موجودة يرجى اضافتها',
      });
    }
    req.jobTitle = jobTitle;
    next();
  });
};

exports.create = (req, res) => {
  const jobTitle = new JobTitle(req.body);
  jobTitle.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  return res.json(req.jobTitle);
};

exports.update = (req, res) => {
  const jobTitle = req.jobTitle;
  jobTitle.name = req.body.name;
  jobTitle.note = req.body.note;
  jobTitle.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  let jobTitle = req.jobTitle;
  jobTitle.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'jobTitle deleted successfully',
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

  const total =JobTitle.find(query).count;
  JobTitle.find(query)
    .sort([[sorter, order]])
    .skip(current * pageSize)
    .limit(pageSize)
    .exec((err, jobTitles) => {
      if (err) {
        return res.status(400).json({
          error: 'JobTitle not found',
        });
      }

      res.json({
        data: jobTitles,
        total,
        success: true,
        pageSize,
        current,
      });
    });
};
