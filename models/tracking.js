const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const trackingSchema = new mongoose.Schema(
  {
    order: {
      type: ObjectId,
      ref: 'Order',
      required: true,
    },
    current_location:{
      type: ObjectId,
      ref: 'Address',
      required: true,
    },
    new_address:{
       type: ObjectId,
      ref: 'Address',
      required: true,
  },
    order_status:{
      type: ObjectId,
      ref: 'Order_Status',
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
