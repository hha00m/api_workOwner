const Branch = require('../models/post');
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
      content: req.body.content,
      shipment_no: req.body.shipment_no,
      statment_no: req.body.statment_no,
      mobile: req.body.mobile,
      importance: req.body.importance,
      open: req.body.open,
      urgent: req.body.urgent,
      postGroup: req.body.postGroup,
      employee: req.body.employee,
      imgPath: req.body.imgPath,
      creater: req.body.creater
    },
  }).then((result) => { res.json(result) })
    .catch((err) => {
      return res.status(400).json({ error: errorHandler(err) })
    })
};
exports.create = (req, res) => {
  const post = {
    content: req.body.data.content,
    shipment_no: req.body.data.shipment_no,
    statment_no: req.body.data.statment_no,
    mobile: req.body.data.mobile,
    importance: req.body.data.importance,
    open: req.body.data.open,
    urgent: req.body.data.urgent,
    postGroup: req.body.data.postGroup,
    employee: req.body.data.employee,
    imgPath: req.body.data.imgPath,
    creater: req.body.currentUser
  }
  const branch = new Branch(post);
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
        data: details,
        success: true,
      });
    }).catch((err) => {
      return res.status(400).json({
        success: false,
        error: 'Town not found',
      })
    })

};