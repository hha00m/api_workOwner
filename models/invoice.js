const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const invoiceSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      trim: true,
      required: true,
      maxlength: 200,
    },

    store: {
      type: ObjectId,
      ref: 'Store',
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Invoice', invoiceSchema);
