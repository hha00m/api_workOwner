const Config = require('../models/websiteConnfig');
const { errorHandler } = require('../helpers/dbErrorHandler');
exports.configById = (req, res, next, id) => {
  Config.findById(id).exec((err, config) => {
    if (err || !config) {
      return res.status(400).json({
        error: 'Config not found',
      });
    }
    console.log('config found ...');
    req.config = config;
    next();
  });
};

exports.update = (req, res) => {
  try {

    Config.update({ _id: req.body.id }, {
      $set: {
        leader: req.body.leader,
        accountingday: req.body.accountingday,
        newweek: req.body.newweek,
        address: req.body.address,
        baghdad: req.body.baghdad,
        companyName: req.body.companyName,
        governaments: req.body.governaments,
        drivers: req.body.drivers,
        overprice: req.body.overprice,
        rural: req.body.rural,
        phone: req.body.phone,
        updateStatus: req.body.updateStatus,
        clientsAd1: req.body.clientsAd1,
        clientsAd2: req.body.clientsAd2,
        driversAd1: req.body.driversAd1,
        driversAd2: req.body.driversAd2,
        logoPath: req.body.logoPath,
      },
    }).then((result) => {
      res.json({ result, success: true })
    })
      .catch((err) => {
        return res.status(400).json({ error: errorHandler(err), success: false })
      })
  } catch (e) {
    return res.status(400).json({ error: errorHandler(err), success: false })

  }

};
exports.read = (req, res) => {
  req.config.photo = undefined;
  return res.json(req.config);
};

exports.create = (req, res) => {

  const config = new Config(req.body);
  config.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
        success: false

      });
    }
    res.json({
      data,
      success: true
    });
  });
};
exports.remove = (req, res) => {
  Config.deleteOne({ _id: req.body.key[0] }).then((result) => {
    res.json({
      message: 'websiteConfig deleted successfully',
      success: true
    });
  }).catch((err) => {
    return res.status(400).json({
      error: errorHandler(err),
      success: false

    });
  })
};



exports.list = (req, res) => {

  Config
    .find()
    .sort({ leader: 1 })
    .then((details) => {
      res.json({
        data: details,
        success: true,
      });
    }).catch((err) => {
      return res.status(400).json({
        success: false,
        error: 'Config not found',
      })
    })

};