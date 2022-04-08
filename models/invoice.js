const mongoose = require('mongoose');
const Employee = require('./employee');
const Store = require('./store');
const { ObjectId } = mongoose.Schema;

const invoiceSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      trim: true,
    },

    isPaid: {
      type: Boolean,
    },
    isReturned: {
      type: Boolean,
    },
    totalPrice: {
      type: Number,
    },
    totalDeliveryPrice: {
      type: Number,
    },
    invoiceNumber: {
      type: Number,
    },
    unRemovable: {
      type: Boolean,
      default: false
    },
    store: Store.schema,
    numberOfShipments: {
      type: Number,
    },
    // employee: Employee.schema,

  },
  { timestamps: true },
);

module.exports = mongoose.model('Invoice', invoiceSchema);
