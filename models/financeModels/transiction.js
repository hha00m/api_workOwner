const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const transictionSchema = new mongoose.Schema(
    {
        transictionNumber: {
            type: Number,
        },
        isDone: {
            type: Boolean,
            default: false
        },
        money: {
            type: Number,
            default: 0,
        },
        liabilities: {
            type: ObjectId,
            ref: 'liabilities',
        },
        asset: {
            type: ObjectId,
            ref: 'asset',
        },
        // createdBy: employee.schema,
        docPath: {
            type: String,
        },
        isDocumented: {
            type: Boolean,
            default: false,
        },
        note: {
            type: String,
            trim: true,
            maxlength: 100
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Transiction", transictionSchema);
