const mongoose = require("mongoose");
const employee = require("../employee");
const entry = require("./entry");


const journalEntrySchema = new mongoose.Schema(
    {
        entryNumber: {
            type: Number,
            required: true,

        },
        payable: entry.schema,
        receivable: entry.schema,
        // createdBy: employee.schema,

        note: {
            type: String,
            trim: true,
            maxlength: 64
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("JournalEntry", journalEntrySchema);
