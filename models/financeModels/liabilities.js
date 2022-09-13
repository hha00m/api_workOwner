const mongoose = require("mongoose");
const liabilitiesStatus = require("./liabilitiesStatus");

const liabilitiesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        type: liabilitiesStatus.schema,
        balance: {
            type: Number,
            default: 0,
        },
        note: {
            type: String,
            trim: true,
            maxlength: 64
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("Liabilities", liabilitiesSchema);
