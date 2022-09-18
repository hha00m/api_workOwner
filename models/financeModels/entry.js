const mongoose = require("mongoose");
const assets = require("./assets");
const expenses = require("./expenses");
const liabilities = require("./liabilities");
const ownersEquity = require('./ownersEquity')
const revenue = require('./revenue')

const entrySchema = new mongoose.Schema(
    {
        entryNumber: {
            type: Number,
        },
        isPayable: {
            type: Boolean,
        },
        money: {
            type: Number,
            default: 0,
        },
        assets: assets.schema,
        expenses: expenses.schema,
        liabilities: liabilities.schema,
        ownersEquity: ownersEquity.schema,
        revenue: revenue.schema,
    },
    { timestamps: true }
);
module.exports = mongoose.model("entry", entrySchema);
