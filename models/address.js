const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const addressSchema = new mongoose.Schema(
  {
    city: {
      type: ObjectId,
      ref: 'City',
      required: true,
    },
    town: {
      type: ObjectId,
      ref: 'Town',
      required: true,
    },

    address: {
      type: String,
      trim: true,
      maxlength: 64,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Address', addressSchema);
