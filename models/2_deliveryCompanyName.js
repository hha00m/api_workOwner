const mongoose = require("mongoose");

const deliveryCompanyNameSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },

        note: {
          type: String,
          trim: true,
          maxlength: 64
        },
        price:  {type: Array}
    },
    { timestamps: true }
);

module.exports = mongoose.model("DeliveryCompanyName", deliveryCompanyNameSchema);
