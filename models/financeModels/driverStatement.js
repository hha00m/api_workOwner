const mongoose = require("mongoose");
const Transiction = require("./transiction");
const { ObjectId } = mongoose.Schema;

const DriverStatementSchema = new mongoose.Schema(
    {
        driver: {
            type: ObjectId,
            ref: 'Driver',
        },
        note: {
            type: String,
            trim: true,
            maxlength: 100
        },
        balance: {
            type: Number,
            default: 0,
        },
        transictions: [Transiction.schema]
    },
    { timestamps: true }
);
module.exports = mongoose.model("DriverStatement", DriverStatementSchema);
