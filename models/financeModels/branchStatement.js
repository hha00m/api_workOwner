const mongoose = require("mongoose");
const Transiction = require("./transiction");
const { ObjectId } = mongoose.Schema;

const branchStatementSchema = new mongoose.Schema(
    {
        branch: {
            type: ObjectId,
            ref: 'Branch',
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
module.exports = mongoose.model("BranchStatement", branchStatementSchema);
