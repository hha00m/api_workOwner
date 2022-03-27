const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
const { ObjectId } = mongoose.Schema;
const Town = require('./town');

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    branch: {
      type: ObjectId,
      ref: 'Branch',
      required: true,
    },
    mobile: {
      type: String,
    },
    note: {
      type: String,
      maxlength: 200,
    },
    address: {
      type: String,
      maxlength: 200,
    },
    photo: [{
      data: Buffer,
      contentType: String,
    }],
    active: {
      type: Boolean,
      default: true,
    },
    hashed_password: {
      type: String,
    },
    salt: String,
  },
  { timestamps: true },
);
// virtual field
driverSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

driverSchema.methods = {
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
};
module.exports = mongoose.model('Driver', driverSchema);
