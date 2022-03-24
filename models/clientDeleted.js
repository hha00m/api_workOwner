const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
const { ObjectId } = mongoose.Schema;
const Government = require('./government');

const clientDeletedSchema = new mongoose.Schema(
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
    visbalData: {
      type: Boolean,
      default: false,
    },
    deliveryPrice: [{
      government: Government.schema,
      urbanPrice: Number,
      ruralPrice: Number,
    }],
    hashed_password: {
      type: String,
    },
    salt: String,
  },
  { timestamps: true },
);
// virtual field
clientDeletedSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

clientDeletedSchema.methods = {
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
module.exports = mongoose.model('ClientDeleted', clientDeletedSchema);
