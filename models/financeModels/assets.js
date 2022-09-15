const mongoose = require("mongoose");
const assetsStatus = require("./assetsStatus");

const assetsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        parent: {
            type: String,
            trim: true,
            maxlength: 55
        },
        type: assetsStatus.schema,
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
module.exports = mongoose.model("Assets", assetsSchema);
