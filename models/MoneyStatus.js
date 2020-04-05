const mongoose = require("mongoose");

const moneyStatusSchema = new mongoose.Schema(
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
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("MoneyStatus", moneyStatusSchema);
