const mongoose = require("mongoose");

const expensesStatusSchema = new mongoose.Schema(
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
        note: {
            type: String,
            trim: true,
            maxlength: 64
        },
        parent: {
            type: String,
            trim: true,
            maxlength: 55
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("ExpensesStatus", expensesStatusSchema);
