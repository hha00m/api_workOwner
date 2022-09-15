const mongoose = require("mongoose");

const revenueStatusSchema = new mongoose.Schema(
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
            maxlength: 255
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("RevenueStatus", revenueStatusSchema);
