const mongoose = require("mongoose");
const ownerEquityType = require("./ownerEquityType");

const ownersEquitySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        type: ownerEquityType.schema,

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
module.exports = mongoose.model(" OwnersEquity", ownersEquitySchema);
