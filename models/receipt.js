const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const receiptSchema = new mongoose.Schema(
  {
    store: {
      type: ObjectId,
      ref: 'Store',
      required: true,
    },
    qty: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    status: {
      type: ObjectId,
      ref: 'Status',
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Receipt', receiptSchema);
