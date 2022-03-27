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
    note: {
      type: String,
      maxlength: 200,
    },

    mobile: {
      type: String,
      trim: true,
      unique: true,
      maxlength: 11,
      minlength: 11,
    },
    government: {
      type: ObjectId,
      ref: 'Government',
      required: true,
    },
    price: {
      type: Number,
      default: 4000,
    }
  },
  { timestamps: true },
);

module.exports = mongoose.model('Branch', branchSchema);
