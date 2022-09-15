const mongoose = require("mongoose");

const ownerEquityTypeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        current: {
            type: Boolean,
            default: false
        },
        parent: {
            type: String,
            trim: true,
            maxlength: 55
        },
        note: {
            type: String,
            trim: true,
            maxlength: 64
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("OwnerEquityType", ownerEquityTypeSchema);
