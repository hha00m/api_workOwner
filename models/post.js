const mongoose = require('mongoose');
const JobTitle = require('./jobTitle');
const User = require('./user');
const PostComment = require('./postCommnet');

const postSchema = new mongoose.Schema(
  {
    content: {
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
      maxlength: 12,
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
    postGroup: JobTitle.schema,
    employee: User.schema,
    comments: [PostComment.schema],
    imgPath: {
      type: String,
      maxlength: 200,
    },
    creater: User.schema,
    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Post', postSchema);
