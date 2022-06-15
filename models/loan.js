const mongoose = require("mongoose");
const Client = require("./client");

const LoanSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
        },
        client: Client.schema,

        isLoan: {
            type: Boolean,
            default: true,
        },
        note: {
            type: String,
            trim: true,
            maxlength: 64
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("Loan", LoanSchema);
