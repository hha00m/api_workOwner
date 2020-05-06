const AttributeName = require('../models/2_attributeName');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.attributeNameById = (req, res, next, id) => {
  AttributeName.findById(id).exec((err, attributeName) => {
    if (err || !attributeName) {
      return res.status(400).json({
        error: 'المدينه غير موجودة يرجى اضافتها',
      });
    }
    req.attributeName = attributeName;
    next();
  });
};

exports.create = (req, res) => {
  const attributeName = new AttributeName(req.body);
  attributeName.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  return res.json(req.attributeName);
};

exports.update = (req, res) => {
  const attributeName = req.attributeName;
  attributeName.name = req.body.name;
  attributeName.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  let attributeName = req.attributeName;
  attributeName.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'attributeName deleted successfully',
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

  const total = AttributeName.find(query).count;
  AttributeName.find(query)
    .sort([[sorter, order]])
      .exec((err, attributeNames) => {
      if (err) {
        return res.status(400).json({
          error: 'attributeNames not found',
        });
      }

      res.json({
        data: attributeNames,
        total,
        success: true,
        pageSize,
        current,
      });
    });
};
