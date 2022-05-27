const mongoose = require('mongoose');
const Employee = require('./employee');

const postCommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      maxlength: 250,
    },

    like: {
      type: Number,
    },
    dislike: {
      type: Number,
    },
    creater: Employee.schema,

  },
  { timestamps: true },
);

module.exports = mongoose.model('PostComment', postCommentSchema);
