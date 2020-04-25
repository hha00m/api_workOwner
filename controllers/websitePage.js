const WebsitePage = require('../models/websitePage');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.websitePageById = (req, res, next, id) => {
  WebsitePage.findById(id).exec((err, websitePage) => {
    if (err || !websitePage) {
      return res.status(400).json({
        error: 'التخويل غير موجودة يرجى اضافتها',
      });
    }
    req.websitePage = websitePage;
    next();
  });
};

exports.create = (req, res) => {
  const websitePage = new WebsitePage(req.body);
  websitePage.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  return res.json(req.websitePage);
};

exports.update = (req, res) => {
  const websitePage = req.websitePage;
  websitePage.name = req.body.name;
  websitePage.note = req.body.note;
  websitePage.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  let websitePage = req.websitePage;
  websitePage.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'websitePage deleted successfully',
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

  const total = WebsitePage.find(query).count;
  WebsitePage.find(query)
    .sort([[sorter, order]])
    .skip(current * pageSize)
    .limit(pageSize)
    .exec((err, websitePages) => {
      if (err) {
        return res.status(400).json({
          error: ' websitePage not found',
        });
      }

      res.json({
        data: websitePages,
        total,
        success: true,
        pageSize,
        current,
      });
    });
};
