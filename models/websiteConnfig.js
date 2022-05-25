const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const websiteConfifSchema = new mongoose.Schema(
  {
    leader: {
      type: String,
      trim: true,
      maxlength: 32,
    },
    companyName: {
      type: String,
      trim: true,
      maxlength: 32,
    },
    accountingday: {
      type: String,
      trim: true,
      maxlength: 32,
    },
    newweek: {
      type: String,
      trim: true,
      maxlength: 32,
    },
    address: {
      type: String,
      maxlength: 200,
    },
    baghdad: {
      type: Number,
      default: 5000,
    },
    governaments: {
      type: Number,
      default: 8000,
    },
    drivers: {
      type: Number,
      default: 3000,
    },
    overprice: {
      type: Number,
      default: 1000,
    },
    rural: {
      type: Number,
      default: 1000,
    },

    phone: {
      type: String,
      trim: true,
      maxlength: 11,
      minlength: 11,
    },
    updateStatus: {
      type: Boolean,
      default: false,
    },
    clientsAd1: {
      type: String,
      maxlength: 200,
    },
    clientsAd2: {
      type: String,
      maxlength: 200,
    },
    driversAd1: {
      type: String,
      maxlength: 200,
    },
    driversAd2: {
      type: String,
      maxlength: 200,
    },
    logoPath: {
      type: String,
      maxlength: 200,
    },

  },
  { timestamps: true },
);

module.exports = mongoose.model('WebsiteConfif', websiteConfifSchema);
