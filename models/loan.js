const mongoose = require("mongoose");
const Client = require("./client");

const LoanSchema = new mongoose.Schema(
    {
        client: Client.schema,
        name: {
            type: Number,
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
