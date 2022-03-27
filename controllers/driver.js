const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Driver = require('../models/driver');
const { errorHandler } = require('../helpers/dbErrorHandler');
const Town = require('../models/town');

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
        urbanPrice: 2000,
        ruralPrice: 3000,
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
exports.list = (req, res) => {

  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  const current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0
  try {
    Driver
      .find()
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
// error need to check again
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