const Post = require('../models/post');
const { errorHandler } = require('../helpers/dbErrorHandler');


exports.postById = (req, res, next, id) => {
  Post.findById(id).exec((err, post) => {
    if (err || !post) {
      return res.status(400).json({
        error: 'post not found',
      });
    }
    console.log('post found ...');
    req.post = post;
    next();
  });
};
exports.update = (req, res) => {
  Post.update({ _id: req.body.id }, {
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
  const postNew = {
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
  const post = new Post(postNew);
  post.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};
exports.remove = (req, res) => {
  Post.deleteOne({ _id: req.body.key[0] }).then((result) => {
    res.json({
      message: 'websiteConfig deleted successfully',
    });
  }).catch((err) => {
    return res.status(400).json({
      error: errorHandler(err),
    });
  })
};
const prepareQuery = (shipment_no, statment_no, mobile,
  importance, open, urgent, postGroup, employee,
  imgPath, creater, createdAt
) => {
  let query = {};
  shipment_no ? query['shipment_no'] = shipment_no : '';
  statment_no ? query['statment_no'] = statment_no : '';
  mobile ? query['mobile'] = mobile : '';
  importance ? importance === 'true' ? query['importance'] = importance : '' : '';
  open ? query['open'] = open : '';
  urgent ? urgent === 'true' ? query['urgent'] = urgent : '' : "";
  imgPath ? query['imgPath'] = imgPath : '';
  // employee ? query['employee._id'] = employee.value : '';
  // postGroup ? query['postGroup._id'] = postGroup.value : '';
  creater ? query['creater._id'] = creater : '';
  createdAt ? query['createdAt'] = { $gte: (createdAt[0]), $lt: (createdAt[1]) } : '';
  return query;
}

exports.list = (req, res) => {
  const query = prepareQuery(req?.query?.shipment_no, req?.query?.statment_no,
    req?.query?.mobile, req?.query?.importance, req?.query?.open,
    req?.query?.urgent, req?.query?.postGroup, req?.query?.employee, req?.query?.imgPath,
    req?.query?.creater, req?.query?.createdAt);

  Post
    .find(query)
    .sort({ leader: 1 })
    .then((details) => {
      res.json({
        data: details,
        success: true,
      });
    }).catch((err) => {
      return res.status(400).json({
        success: false,
        error: 'posts not found',
      })
    })

};