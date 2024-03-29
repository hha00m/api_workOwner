const Driver = require('../models/driver');
const { errorHandler } = require('../helpers/dbErrorHandler');
const Town = require('../models/town');
const { default: mongoose } = require('mongoose');

exports.driverById = (req, res, next, id) => {
  try {
    Driver.findById(id).exec((err, driver) => {
      if (err || !driver) {
        return res.status(400).json({
          error: 'driver not found',
        });
      }
      console.log('driver found ...');
      req.driver = driver;
      next();
    });
  } catch (err) {
    console.log(err);
  }

};
exports.read = (req, res) => {
  req.driver.photo = undefined;
  return res.json(req.driver);
};
exports.create = (req, res) => {
  try {
    const driver = new Driver(req.body);
    let townPrice = [];
    let price;
    req.body.towns?.forEach(town => {
      price = {
        town: town,
        urbanPrice: req.body?.urbanPrice,
        ruralPrice: req.body?.urbanPrice,
      }
      townPrice.push(price);
    })
    driver.deliveryPrice = townPrice;
    driver.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json({
        data, success: true,
      });
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};
exports.removeDriverFromTown = (req, res) => {
  try {
    Town.update({ _id: req.body.townId }, {
      $unset: {
        driver: req.body.driverId,
        allocated: false
      },
    }).then((result) => {
      res.json({
        message: 'driver removed from town successfully',
      });
    }).catch((err) => {
      return res.status(400).json({
        error: errorHandler(err),
      });
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};
exports.removeDriverFromAllTown = (req, res) => {
  try {
    Town.updateMany({ driver: mongoose.Types.ObjectId(req.body.id) }, {
      $unset: {
        allocated: false,
        driver: req.body.id
      },
    }).then((result) => {
      res.json({
        message: 'driver removed from town successfully',
      });
    }).catch((err) => {
      return res.status(400).json({
        error: errorHandler(err),
      });
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};
exports.remove = (req, res) => {
  try {
    Driver.deleteOne({ _id: req.body.key })
      .then((result) => {
        res.json({
          message: 'Driver deleted successfully',
          success: true,

        });
      }).catch((err) => {
        return res.status(400).json({
          error: errorHandler(err),
        });
      })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};
exports.update = (req, res) => {
  try {
    Driver.update({ _id: req.body.id }, {
      $set: {
        name: req.body.name, address: req.body.address,
        mobile: req.body.mobile, note: req.body.note,
        brunch: req.body.brunch,
        active: req.body.active,
        ruralPrice: req.body.ruralPrice,
        urbanPrice: req.body.urbanPrice,
      },
    }).then((result) => {
      res.json({
        result,
        success: true,
      })
    })
      .catch((err) => {
        return res.status(400).json({ error: errorHandler(err) })
      })
  }
  catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};
exports.updateTownsPrice = (req, res) => {
  try {
    Town.updateMany({ driver: mongoose.Types.ObjectId(req.body.id), center: req.body.center }, {
      $set: {
        price: req.body.center ? req.body.urbanPrice : req.body.ruralPrice
      },
    })
      .then((result) => {
        res.json({
          result,
          success: true,
        })
      })
      .catch((err) => {
        return res.status(400).json({ error: errorHandler(err) })
      })
  }
  catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};

const prepareQuery = (
  name,
  branch,
  urbanPrice,
  ruralPrice,
  mobile,
  createdAt
) => {
  let query = {};
  name ? query['name'] = name : '';
  branch ? query['branch'] = mongoose.Types.ObjectId(branch) : '';
  urbanPrice ? query['urbanPrice'] = urbanPrice : '';
  ruralPrice ? query['ruralPrice'] = ruralPrice : '';
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
    req?.query?.urbanPrice,
    req?.query?.ruralPrice,
    req?.query?.mobile,
    req?.query?.createdAt);

  try {
    Driver
      .find(query)
      .populate('branch', 'name _id')
      // .skip(pageSize * current)
      // .limit(pageSize)
      .sort({ name: 1 })
      // .select('name icon _id')
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
          error: 'driver not found',
          success: false,
        })
      })
  }
  catch (err) {
    return res.status(400).json({
      error: 'drivers not found',
      success: false,
    })
  }
}
exports.photo = (req, res, next) => {
  // console.log('you are here');
  if (req.driver.photo.data) {
    res.set('Content-Type', req.driver.photo.contentType);
    return res.send(req.driver.photo.data);
  }
  next();
};
exports.listPrices = (req, res) => {

  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  const current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0
  try {
    Driver
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
          error: 'drivers not found',
          success: false,
        })
      })
  }
  catch (err) {
    return res.status(400).json({
      error: 'drivers not found',
      success: false,
    })
  }
}
exports.listStores = (req, res) => {

  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  const current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0
  try {
    Town
      .find({ driver: req.query.id })
      .populate('government', 'name  _id')
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
          error: 'towns not found',
          success: false,
        })
      })
  } catch (err) {
    return res.status(400).json({
      error: 'towns not found',
      success: false,
    })
  }
}