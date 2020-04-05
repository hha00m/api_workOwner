const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const trackingSchema = new mongoose.Schema(
  {
    order: {
      type: ObjectId,
      ref: 'Order',
      required: true,
    },
    currentLocation:{
      type: ObjectId,
      ref: 'Address',
      required: true,
    },
    newAddress:{
       type: ObjectId,
      ref: 'Address',
      required: true,
  },
    orderStatus:{
      type: ObjectId,
      ref: 'OrderStatus',
      required: true,

    },
    note:{
      type: String,
      trim: true,
      maxlength: 64

    },
    items_no:{
      type:Number,
      maxlength:8
    }
  },
  { timestamps: true },
);

module.exports = mongoose.model('Tracking', trackingSchema);
