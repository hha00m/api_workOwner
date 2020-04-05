const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
const { ObjectId } = mongoose.Schema;

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      maxlength: 200,
    },
    mobile: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      maxlength: 11,
      minlength: 11,
    },
    branch: {
      type: ObjectId,
      ref: 'Branch',
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

// virtual field
clientSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

  clientSchema.methods = {
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
module.exports = mongoose.model('Client', clientSchema);
