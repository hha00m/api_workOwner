const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const Government = require('./government');
const Branch = require('./branch');
const Town = require('./town');
const Store = require('./store');
const Driver = require('./driver');
const OrderStatus = require('./orderStatus');
const Employee = require('./employee');
const Invoice = require('./invoice');


const orderSchema = new mongoose.Schema(
  {
    shipment_no: {
      type: Number,
      require: true,
      maxlength: 20,
    },
    originalPrice: {
      type: Number,
      require: true,
    },
    newPrice: {
      type: Number,
    },
    isBreakable: {
      type: Boolean,
      default: false,
    },
    pay: {
      type: Boolean,
      default: false,
    },
    customerMobile: {
      type: String,
      maxlength: 11,
      minlength: 10,
    },
    weight: {
      type: Number,
      default: 1,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    note: {
      type: String,
      trim: true,
      maxlength: 250,
    },
    address: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    clientDeliveryPrice: {
      type: Number,
    },
    driverDeliveryPrice: {
      type: Number,
    },
    branchDeliveryPrice: {
      type: Number,
    },
    senderBranchPrice: {
      type: Number,
    },
    driverMoneyStatus: {
      type: Boolean,
      default: false,
    },
    clientMoneyStatus: {
      type: Boolean,
      default: false,
    },
    BranchMoneyStatus: {
      type: Boolean,
      default: false,
    },
    clientStatus: OrderStatus.schema,
    driverStatus: OrderStatus.schema,
    branchStatus: OrderStatus.schema,

    toGovernment: Government.schema,
    toTown: Town.schema,
    toBranch: Branch.schema,
    fromBranch: Branch.schema,

    store: Store.schema,
    driver: Driver.schema,
    createdBy: Employee.schema,

    BranchAccounting: Employee.schema,
    driverAccounting: Employee.schema,
    clientInvoice: Invoice.schema,
    clientDInvoiceIndex: {
      type: Number
    },
    driverDInvoiceIndex: {
      type: Number
    },
    branchDInvoiceIndex: {
      type: Number
    },
    clientReturnInvoice: {
      type: ObjectId,
      ref: 'Invoice',
    },
    isClientInvoiceGenrated: {
      type: Boolean,
      default: false
    },
    isParitalReturn: {
      type: Boolean,
      default: false
    },
    isReturned: {
      type: Boolean,
      default: false
    },
    driverInvoice: Invoice.schema,
    branchInvoice: Invoice.schema,
    importStorage: {
      type: Boolean,
      default: false,
    },
    storageImporter: Employee.schema,
  },
  { timestamps: true },
);

module.exports = mongoose.model('Shipment', orderSchema);
