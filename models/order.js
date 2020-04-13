const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    order_no: {
      type: Number,
      require: true,
      maxlength: 11,
    },
    price: {
      type: Number,
      require: true,
      maxlength: 11,
    },
    newPrice: {
      type: Number,
      require: true,
      maxlength: 11,
    },
    orederType: {
      type: ObjectId,
      ref: 'OrderType',
      required: true,
    },
    isBreakable: {
      type: Boolean,
      default: false,
    },
    client: {
      type: ObjectId,
      ref: 'Client',
      required: true,
    },
    driver: {
      type: ObjectId,
      ref: 'Staff',
    },
    manager: {
      type: ObjectId,
      ref: 'Staff',
    },
    moneyStatus: {
      type: ObjectId,
      ref: 'MoneyStatus',
    },
    isAgreed: {
      type: Boolean,
    },
    toAddress: {
      type: ObjectId,
      ref: 'Address',
      required: true,
    },
    deliveryPrice: {
      type:Number,
      required: true,
    },
    fromBranch: {
      type: ObjectId,
      ref: 'Branch',
    },
    toBranch: {
      type: ObjectId,
      ref: 'Branch',
      required:true
    },
    customerMobile: {
      type: Number,
      require: true,
      maxlength: 11,
      minlength: 11,
    },
    customerName: {
      type: String,
      trim: true,
      maxlength: 200
    },
    withDelivery: {
      type: Boolean,
      default: true,
    },
    qty: {
      type: Number,
      require: true,
      maxlength: 11,
      default: 1,
    },
    weight: {
      type: Number,
      require: true,
      maxlength: 11,
      default: 1,
    },
    orderStatus: {
      type: ObjectId,
      ref: 'OrderStatus',
    },
    invoice: {
      type: ObjectId,
      ref: 'Invoice',
    },
    store: {
      type: ObjectId,
      ref: 'Store',
      required: true,
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
