const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const Client = require('./client');
const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    note: {
      type: String,
      maxlength: 200,
    },
    client: Client.schema,
  },
  { timestamps: true },
);

module.exports = mongoose.model('Store', storeSchema);
