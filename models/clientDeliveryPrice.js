const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const clientDeliveryPriceSchema = new mongoose.Schema(
  {
    city: {
      type: ObjectId,
      ref: 'City',
      required: true,
    },
    client: {
      type: ObjectId,
      ref: 'Client',
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('ClientDeliveryPrice', clientDeliveryPriceSchema);
