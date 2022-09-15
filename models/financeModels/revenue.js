const mongoose = require("mongoose");
const revenueStatus = require("./revenueStatus");

const revenueSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        type: revenueStatus.schema,
        balance: {
            type: Number,
            default: 0,
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
module.exports = mongoose.model("Revenue", revenueSchema);
