const mongoose = require("mongoose");
const expensesStatus = require("./expensesStatus");

const expensesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        type: expensesStatus.schema,
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
module.exports = mongoose.model("Expenses", expensesSchema);
