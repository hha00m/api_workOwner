const mongoose = require("mongoose");
const Client = require("./client");
const Employee = require("./employee");

const LoanSchema = new mongoose.Schema(
    {
        balance: {
            type: Number,
            default: 0,
        },
        amount: {
            type: Number,
        },
        client: Client.schema,

        isLoan: {
            type: Boolean,
            default: true,
        },
        creator: Employee.schema,
        note: {
            type: String,
            trim: true,
            maxlength: 64
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("Loan", LoanSchema);
