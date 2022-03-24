const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const deletedDtoreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    client: {
      type: ObjectId,
      ref: 'Client',
      required: true,
    },
    note: {
      type: String,
      maxlength: 200,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('DeletedStore', deletedDtoreSchema);
