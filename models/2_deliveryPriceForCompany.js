const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const deliveryPriceForCompanySchema = new mongoose.Schema(
  {
    city: {
      type: ObjectId,
      ref: 'City',
      required: true,
    },
    deliveryCompanyName: {
      type: ObjectId,
      ref: 'DeliveryCompanyName',
      required: true,
    },
    price:{
      type:Number,
      required:true,

    }


  },
  { timestamps: true },
);

module.exports = mongoose.model('DeliveryPriceForCompany', deliveryPriceForCompanySchema);
