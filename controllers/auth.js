const User = require('../models/user');
const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt'); // for authorization check
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.signup = (req, res) => {
  // console.log("req.body", req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      status: 'ok',
      currentAuthority: user,
    });
  });
};

exports.signin = (req, res) => {
  // find the user based on email
  const { email, password, type } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User with that email does not exist. Please signup',
      });
    }
    // if user is found make sure the email and password match
    // create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: 'Email and password dont match',
      });
    }
    // generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // persist the token as 't' in cookie with expiry date
    res.cookie('t', token, { expire: new Date() + 9999 });
    // return response with user and token to frontend client
    //const { _id, name, email, mobile, role,userName } = user;
       const { _id } = user;
 return res.json({
      status: 'ok',
      type,
      _id,
      token,
      currentAuthority: 'admin',
    });
  });
};
exports.signinusername = (req, res) => {
  return res.json({
    status: 'ok',
    type:'account',
    currentAuthority: 'admin',
  });
  // find the user based on email
  const { userName, password, type } = req.body;
  console.log(req.body);
  User.findOne({ userName }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User with that username does not exist. Please signup',
      });
    }
    // create authenticate method in user model
    if (!user.authenticate(password)) {
      console.log("not exsit");

      return res.status(401).json({
        error: 'username and password dont match',
      });
    }
    // generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // persist the token as 't' in cookie with expiry date
    res.cookie('t', token, { expire: new Date() + 9999 });
    // return response with user and token to frontend client
    //const { _id, name, email, mobile, role,userName } = user;
    // return res.json({
    //   status: 'ok',
    //       token,
    // _id,
//  type,
    //   currentAuthority: 'admin',
    // });
  });
};



exports.signinMobile = (req, res) => {
  // find the user based on mobile number
  const { mobile, password,type } = req.body;
  User.findOne({ mobile }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'رجاء قم بتسجيل, رقم الموبايل غير متاح',
      });
    }
    // if user is found make sure the mobile and password match
    // create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: 'تأكد من رقم الموبايل او كلمة المرور, غير صحيحة',
      });
    }
    // generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // persist the token as 't' in cookie with expiry date
    res.cookie('t', token, { expire: new Date() + 9999 });
    // return response with user and token to frontend client
    const {_id}=user;
    return res.json({
      status: 'ok',
        type,
        token,
        _id,
        currentAuthority: 'admin',
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie('t');
  res.json({ message: 'Signout success' });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'auth',
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: 'Access denied',
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: 'Admin resourse! Access denied',
    });
  }
  next();
};
