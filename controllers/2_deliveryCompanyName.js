const DeliveryCompanyName = require('../models/2_deliveryCompanyName');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.deliveryCompanyNameById = (req, res, next, id) => {
  DeliveryCompanyName.findById(id).exec((err, deliveryCompanyName) => {
    if (err || !deliveryCompanyName) {
      return res.status(400).json({
        error: 'المدينه غير موجودة يرجى اضافتها',
      });
    }
    req.deliveryCompanyName = deliveryCompanyName;
    next();
  });
};

exports.create = (req, res) => {
  const deliveryCompanyName = new DeliveryCompanyName(req.body);
  deliveryCompanyName.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  return res.json(req.deliveryCompanyName);
};

exports.update = (req, res) => {
  const deliveryCompanyName = req.deliveryCompanyName;
  deliveryCompanyName.name = req.body.name;
  deliveryCompanyName.note = req.body.note;
  deliveryCompanyName.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  let deliveryCompanyName = req.deliveryCompanyName;
  deliveryCompanyName.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'deliveryCompanyName deleted successfully',
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

  const total = DeliveryCompanyName.find(query).count;
  DeliveryCompanyName.find(query)
    .sort([[sorter, order]])
      .exec((err, cities) => {
      if (err) {
        return res.status(400).json({
          error: 'deliveryCompanyNames not found',
        });
      }

      res.json({
        data: deliveryCompanyNames,
        total,
        success: true,
        pageSize,
        current,
      });
    });
};
