const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
const Town = require('./town');
const Government = require('./government');
const jwt = require('jsonwebtoken');
const process = require('process');

const userSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
      trim: true,
      maxlength: 255,
    },
    signature: {
      type: String,
      trim: true,
      maxlength: 32,
    },
    title: {
      type: String,
      trim: true,
      maxlength: 32,
    },
    group: {
      type: String,
      trim: true,
    },
    // tags: [{ key: string, label: string }],
    notifyCount: {
      type: Number,
      default: 0
    },
    unreadCount: {
      type: Number,
      default: 0
    },
    country: {
      type: String,
      trim: true,
      default: 'العراق',
    },
    access: {
      type: String,
      trim: true,
    },
    geographic: {
      province: Government.schema,
      city: Town.schema,
    },
    address: {
      type: String,
      trim: true,
      maxlength: 255,
    },
    autoLogin: {
      type: Boolean,
    },
    name: {
      type: String,
      trim: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
      maxlength: 11,
      minlength: 10,
    },
    username: {
      type: String,
      trim: true,
      maxlength: 32,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
);

userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    } catch (err) {
      return '';
    }
  },
  generateAuthToken: function () {
    const t = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return t;
  }
};

// virtual field
userSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

module.exports = mongoose.model('User', userSchema);
