const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const JobTitle = './jobTitle.js'
const Employee = './employee.js'

const postSchema = new mongoose.Schema(
  {
    postText: {
      type: String,
      maxlength: 250,
    },

    shipment_no: {
      type: Number,
    },
    statment_no: {
      type: Number,
    },
    mobile: {
      type: String,
      trim: true,
      maxlength: 11,
      minlength: 10,
    },
    importance: {
      type: Boolean,
      default: false,
    },
    open: {
      type: Boolean,
      default: false,
    },
    urgent: {
      type: Boolean,
      default: false,
    },
    group: [JobTitle.Schema],
    employees: [Employee.Schema],

    imgPath: {
      type: String,
      maxlength: 200,
    },

  },
  { timestamps: true },
);

module.exports = mongoose.model('Post', postSchema);
