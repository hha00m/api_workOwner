const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
const { ObjectId } = mongoose.Schema;

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,

      maxlength: 32,
    },

    branch: {
      type: ObjectId,
      ref: 'Branch',

    },
    jobTitle: {
      type: ObjectId,
      ref: 'JobTitle',

    },
    mobile: {
      type: String,
    },
    salary: {
      type: Number,
      default: 0,
    },
    note: {
      type: String,
      maxlength: 200,
    },
    address: {
      type: String,
      maxlength: 200,
    },
    details: {
      type: String,
      maxlength: 200,
    },
    photo: [{
      data: Buffer,
      contentType: String,
    }],
    hashed_password: {
      type: String,
    },
    salt: String,
  },
  { timestamps: true },
);
// virtual field
employeeSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

employeeSchema.methods = {
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
module.exports = mongoose.model('Employee', employeeSchema);
