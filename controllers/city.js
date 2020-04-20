const City = require('../models/city');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.cityById = (req, res, next, id) => {
  City.findById(id).exec((err, city) => {
    if (err || !city) {
      return res.status(400).json({
        error: 'المدينه غير موجودة يرجى اضافتها',
      });
    }
    req.city = city;
    next();
  });
};

exports.create = (req, res) => {
  const city = new City(req.body);
  city.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  return res.json(req.city);
};

exports.update = (req, res) => {
  const city = req.city;
  city.name = req.body.name;
  city.note = req.body.note;
  city.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  let city = req.city;
  city.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'city deleted successfully',
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

  const total = City.find(query).count;
  City.find(query)
    .sort([[sorter, order]])
    .skip(current * pageSize)
    .limit(pageSize)
    .exec((err, cities) => {
      if (err) {
        return res.status(400).json({
          error: 'city not found',
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
