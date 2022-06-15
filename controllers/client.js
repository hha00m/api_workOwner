const Client = require('../models/client');
const { errorHandler } = require('../helpers/dbErrorHandler');
const mongoose = require('mongoose');

const Store = require('../models/store');
exports.clientById = (id) => {
  try {
    Client.find({ _id: id }).then((result) => {
      return result;
    }).catch((err) => {
      return err;
    });
    return {};
  }
  catch (err) {
    return {}
  };
}
exports.read = (req, res) => {
  req.client.photo = undefined;
  return res.json(req.client);
};
exports.create = (req, res) => {
  const client = new Client(req.body);
  let governPrice = [];
  let price;
  req.body.governments.forEach(government => {
    if (government._id != "622bbe196761329b50fa2486") {
      price = {
        government: government,
        urbanPrice: 8000,
        ruralPrice: 8000,
      }
      governPrice.push(price);
    } else {
      price = {
        government: government,
        urbanPrice: 5000,
        ruralPrice: 5000,
      }
      governPrice.push(price);

    }
  })
  client.deliveryPrice = governPrice;
  client.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      data, success: true,
    });
  });
};
exports.remove = (req, res) => {
  Client.deleteMany({ '_id': { '$in': req.body.keys } })
    .then((result) => {
      res.json({
        success: true,
        message: 'store deleted successfully',
      });
    }).catch((err) => {
      return res.status(400).json({
        error: errorHandler(err),
        success: false,
      });
    })
};
exports.update = (req, res) => {
  Client.update({ _id: req.body.id }, {
    $set: {
      name: req.body.name, address: req.body.address,
      mobile: req.body.mobile, note: req.body.note,
      brunch: req.body.brunch,
      visbalData: req.body.visbalData,
    },
  }).then((result) => {
    res.json({
      result, success: true,
    })
  })
    .catch((err) => {
      return res.status(400).json({ error: errorHandler(err) })
    })
};

const prepareQuery = (
  name,
  branch,
  mobile,
  createdAt
) => {
  let query = {};
  name ? query['name'] = name : '';
  branch ? query['branch'] = mongoose.Types.ObjectId(branch) : '';
  mobile ? query['mobile'] = mobile : '';
  createdAt ? query['createdAt'] = { $gte: (createdAt[0]), $lt: (createdAt[1]) } : '';
  return query;
}
exports.list = (req, res) => {

  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  const current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0
  const query = prepareQuery(
    req?.query?.name,
    req?.query?.branch,
    req?.query?.mobile,
    req?.query?.createdAt);

  Client
    .find(query)
    .populate('branch', 'name _id')
    // .skip(pageSize * current)
    // .limit(pageSize)
    .sort({ name: 1 })
    // .select('name icon _id')
    .then((jobtitles) => {
      res.json({
        data: jobtitles,
        success: true,
        current,
        pageSize,
        total: jobtitles.length,
      });
    }).catch((err) => {
      return res.status(400).json({
        error: 'jobtitle not found',
        success: false,
      })
    })
}
exports.photo = (req, res, next) => {
  // console.log('you are here');
  if (req.client.photo.data) {
    res.set('Content-Type', req.client.photo.contentType);
    return res.send(req.client.photo.data);
  }
  next();
};

exports.listPrices = (req, res) => {

  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  const current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0

  Client
    .find({ _id: req.query.id })
    .populate('deliveryPrice', 'name  _id')
    // .skip(pageSize * current)
    // .limit(pageSize)
    .sort({ name: 1 })
    .select('deliveryPrice  _id')
    .then((data) => {
      res.json({
        data: data[0].deliveryPrice,
        success: true,
        current,
        pageSize,
        total: data[0].deliveryPrice.length,
      });
    }).catch((err) => {
      return res.status(400).json({
        error: 'jobtitle not found',
        success: false,
      })
    })
}

exports.listStores = (req, res) => {

  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  const current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0
  try {



    Store
      .find({ 'client._id': req.query.id })
      // .skip(pageSize * current)
      // .limit(pageSize)
      .sort({ name: 1 })
      // .select('deliveryPrice  _id')
      .then((data) => {
        res.json({
          data: data,
          success: true,
          current,
          pageSize,
          total: data.length,
        });
      }).catch((err) => {
        return res.status(400).json({
          error: 'stores not found',
          success: false,
        })
      })
  } catch (err) {
    return res.status(400).json({
      error: 'stores not found',
      success: false,
    })
  }
}