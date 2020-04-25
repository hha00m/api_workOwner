const WebsitePagesList = require('../models/websitePagesList');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.websitePagesListById = (req, res, next, id) => {
  WebsitePagesList.findById(id).exec((err, websitePagesList) => {
    if (err || !websitePagesList) {
      return res.status(400).json({
        error: 'التخويل غير موجودة يرجى اضافتها',
      });
    }
    req.websitePagesList = websitePagesList;
    next();
  });
};

exports.create = (req, res) => {
  const websitePagesList = new WebsitePagesList(req.body);
  websitePagesList.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  return res.json(req.websitePagesList);
};

exports.update = (req, res) => {
  const websitePagesList = req.websitePagesList;
  websitePagesList.name = req.body.name;
  websitePagesList.note = req.body.note;
  websitePagesList.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  let websitePagesList = req.websitePagesList;
  websitePagesList.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'websitePagesList deleted successfully',
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

  const total = WebsitePagesList.find(query).count;
  WebsitePagesList.find(query)
    .sort([[sorter, order]])
    .skip(current * pageSize)
    .limit(pageSize)
    .exec((err, cities) => {
      if (err) {
        return res.status(400).json({
          error: ' websitePagesList not found',
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
