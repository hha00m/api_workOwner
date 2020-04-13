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
    city: {
      type: ObjectId,
      ref: 'City',
      required: true,
    },
    center: {
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
