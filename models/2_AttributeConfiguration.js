const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const attConfSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    attributeName: {
      type: ObjectId,
      ref: 'AttributeName',
      required: true,
    },

  },
  { timestamps: true },
);

module.exports = mongoose.model('AttributeConfiguration', attConfSchema);
