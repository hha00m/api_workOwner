const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    branch: {
      type: ObjectId,
      ref: 'Branch',
      required: true,
    },
    mobile: {
      type: String,
    },
    note: {
      type: String,
      maxlength: 200,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Client', clientSchema);
