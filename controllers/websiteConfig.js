const Branch = require('../models/websiteConnfig');
const { errorHandler } = require('../helpers/dbErrorHandler');
exports.branchById = (req, res, next, id) => {
  Branch.findById(id).exec((err, branch) => {
    if (err || !branch) {
      return res.status(400).json({
        error: 'branch not found',
      });
    }
    console.log('branch found ...');
    req.branch = branch;
    next();
  });
};

exports.update = (req, res) => {


  Branch.update({ _id: req.body.id }, {
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
  }).then((result) => { res.json(result) })
    .catch((err) => {
      return res.status(400).json({ error: errorHandler(err) })
    })


};
exports.read = (req, res) => {
  req.branch.photo = undefined;
  return res.json(req.branch);
};

exports.create = (req, res) => {

  const branch = new Branch(req.body);
  branch.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};
exports.remove = (req, res) => {
  Branch.deleteOne({ _id: req.body.key[0] }).then((result) => {
    res.json({
      message: 'websiteConfig deleted successfully',
    });
  }).catch((err) => {
    return res.status(400).json({
      error: errorHandler(err),
    });
  })
};



exports.list = (req, res) => {

  Branch
    .find()
    .sort({ leader: 1 })
    .then((details) => {
      res.json({
        data: details.length > 0 ? details[0] : {},
        success: true,
      });
    }).catch((err) => {
      return res.status(400).json({
        success: false,
        error: 'Town not found',
      })
    })

};