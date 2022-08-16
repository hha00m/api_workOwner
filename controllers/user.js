const { default: mongoose } = require('mongoose');
const User = require('../models/user');


const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)


const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { uploadFile, getFileStream } = require('../helpers/s3');

//----------------------
exports.readImageS3 = (req, res) => {
  const key = req?.params?.key
  const readStream = getFileStream(key)

  readStream.pipe(res)
}
exports.postImageS3 = async (req, res) => {

  const file = req.file;

  // apply filter
  // resize 

  const result = await uploadFile(file)
  await unlinkFile(file.path)
  console.log(result)
  res.send({ imagePath: `/images/${result.Key}` })
}
exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found',
      });
    }
    req.profile = user;
    next();
  });
};
exports.currentUser = async (req, res) => {
  const user = await User.findById(req?.user?._id).select('-password');
  return res.send({ data: user });

};
exports.remove = (req, res) => {
  User.deleteMany({ '_id': { '$in': req.body.keys } })
    .then((result) => {
      res.json({
        success: true,
        message: 'user deleted successfully',
      });
    }).catch((err) => {
      return res.status(400).json({
        error: errorHandler(err),
        success: false,
      });
    })
};
exports.update = (req, res) => {
  User.update({ _id: req.body.id }, {
    $set: {
      name: req.body.name,
      note: req.body.note,
      address: req.body.address,
      town: req.body.town,
      username: req.body.username,
      password: req.body.password,
      phone: req.body.phone,
      email: req.body.email,
      avatar: req.body.avatar,
      government: req.body.government,
      salary: req.body.salary,
      center: req.body.center
    },
  }).then((result) => { res.json(result) })
    .catch((err) => {
      return res.status(400).json({ error: errorHandler(err) })
    })
};
const prepareQuery = (
  name,
  branch,
  jobTitle,
  mobile,
  salary,
  createdAt,
  government,
  town
) => {
  let query = {};
  name ? query['name'] = name : '';
  branch ? query['branch'] = mongoose.Types.ObjectId(branch) : '';
  government ? query['government'] = mongoose.Types.ObjectId(government) : '';
  town ? query['town'] = mongoose.Types.ObjectId(town) : '';
  jobTitle ? query['jobTitle'] = mongoose.Types.ObjectId(jobTitle) : '';
  mobile ? query['mobile'] = mobile : '';
  salary ? query['salary'] = salary : '';
  createdAt ? query['createdAt'] = { $gte: (createdAt[0]), $lt: (createdAt[1]) } : '';
  return query;
}
exports.list = (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 20; //page size which is limeit
  const current = (req.query.current ? parseInt(req.query.current) : 1) - 1; // return currnet page else 0
  const query = prepareQuery(
    req?.query?.name,
    req?.query?.branch,
    req?.query?.jobTitle,
    req?.query?.mobile,
    req?.query?.salary,
    req?.query?.createdAt,
    req?.query?.government,
    req?.query?.town,
  );


  User
    .find(query)
    .populate('jobTitle', 'name _id')
    .populate('branch', 'name _id')
    .populate('town', 'name _id')
    .populate('government', 'name _id')
    // .skip(pageSize * current)
    // .limit(pageSize)
    .sort({ createdAt: 1 })
    .then((users) => {
      res.json({
        data: users,
        success: true,
        current,
        pageSize,
        total: users.length,
      });
    }).catch((err) => {
      return res.status(400).json({
        success: false,
        error: 'employee not found',
      })
    })

};