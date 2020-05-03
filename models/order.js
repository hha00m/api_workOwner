const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    order_no: {
      type: Number,
      require: true,
      maxlength: 20,
    },
    price: {
      type: Number,
      require: true,
      maxlength: 20,
    },
    newPrice: {
      type: Number,
      maxlength: 11,
    },
    category: {
      type: ObjectId,
      ref: 'Category',
    },
    isBreakable: {
      type: Boolean,
      default: false,
    },
    client: {
      type: ObjectId,
      ref: 'Client',
     },
     store: {
      type: ObjectId,
      ref: 'Store',
    },
    driver: {
      type: ObjectId,
      ref: 'Employee',
    },
    manager: {
      type: ObjectId,
      ref: 'Employee',
    },
    moneyStatus: {
      type: ObjectId,
      ref: 'MoneyStatus',
    },
    isAgreed: {
      type: Boolean,
    },
    toCity: {
      type: ObjectId,
      ref: 'City',
    },
    toTown: {
      type: ObjectId,
      ref: 'Town',
    },
    toAddress: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    deliveryPrice: {
      type: Number,
    },
    fromBranch: {
      type: ObjectId,
      ref: 'Branch',
    },
    toBranch: {
      type: ObjectId,
      ref: 'Branch',
    },
    customerMobile: {
      type: Number,
     },
    customerName: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    withDelivery: {
      type: Boolean,
      default: true,
    },
    qty: {
      type: Number,
      maxlength: 11,
      default: 1,
    },
    weight: {
      type: Number,
      maxlength: 11,
      default: 1,
    },
    orderStatus: {
      type: ObjectId,
      ref: 'OrderStatus',
    },
    filledBy: {
      type: ObjectId,
      ref: 'Employee',
    },
    invoice: {
      type: ObjectId,
      ref: 'Invoice',
    },

    confirmed: {
      type: Boolean,
      default: false,
    },
    note: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    isFilledByClient: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Order', orderSchema);
