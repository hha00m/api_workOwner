const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const staffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      maxlength: 11,
      minlength: 11,
    },
    mobile2: {
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
    emplyeeID: {
      type: String,
      trim: true,
      unique: true,
      maxlength: 50,
    },
    role: {
      type: ObjectId,
      ref: 'Role',
      required: true,
    },

    account_type: {
      type: ObjectId,
      ref: 'AccountType',
      required: true,
    },
    enabled: {
      type: Boolean,
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
    note: {
      type: String,
      maxlength: 200,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Staff', staffSchema);
