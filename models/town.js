const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const townSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    government: {
      type: ObjectId,
      ref: 'Government',
      required: true,
    },
    driver: {
      type: ObjectId,
      ref: 'Driver',
    },
    price: {
      type: Number,
      default: 3000,
    },
    center: {
      type: String,
      default: "كلا",
    },
    allocated: {
      type: Boolean,
      default: false,
    },
    note: {
      type: String,
      maxlength: 200,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Town', townSchema);
