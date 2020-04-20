const OrderStatus = require('../models/orderStatus');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.OrderStatusById = (req, res, next, id) => {
  OrderStatus.findById(id).exec((err, orderStatus) => {
    if (err || !orderStatus) {
      return res.status(400).json({
        error: 'الحالة غير موجودة يرجى اضافتها',
      });
    }
    req.orderStatus = orderStatus;
    next();
  });
};

exports.create = (req, res) => {
  const orderStatus = new OrderStatus(req.body);
  orderStatus.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  return res.json(req.orderStatus);
};

exports.update = (req, res) => {
  const orderStatus = req.orderStatus;
  orderStatus.name = req.body.name;
  orderStatus.note = req.body.note;
  orderStatus.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  let orderStatus = req.orderStatus;
  orderStatus.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'orderStatus deleted successfully',
    });
  });
};

exports.list = (req, res) => {
  //---------------------sort live--------------------------
  console.log("name is here: ",req.body.name);
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
    query['$and']=[];
    query["$and"].push({ name: { $regex: '.*' + fName + '.*' } });
   }
  let pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  let current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0

  const total = OrderStatus.find(query).count;
  OrderStatus.find(query)
    .sort([[sorter, order]])
    .skip(current * pageSize)
    .limit(pageSize)
    .exec((err, orderStatus) => {
      if (err) {
        return res.status(400).json({
          error: 'orderStatus not found',
        });
      }

      res.json({
        data: orderStatus,
        total,
        success: true,
        pageSize,
        current,
      });
    });
};
