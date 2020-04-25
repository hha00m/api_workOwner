const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const permissionSchema = new mongoose.Schema(
  {
    newJobTitle: {
      type: ObjectId,
      ref: 'JobTitle',
      required: true,
    },
    websitePagesList: {
      type: ObjectId,
      ref: 'WebsitePage',
      required: true,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    delete: {
      type: Boolean,
      default: false,
    },
    read: {
      type: Boolean,
      default: false,
    },
    add: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Permission', permissionSchema);
