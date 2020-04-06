const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const branchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
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
    city: {
      type: ObjectId,
      ref: 'City',
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String
  },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Branch', branchSchema);
