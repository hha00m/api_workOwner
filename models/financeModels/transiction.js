const mongoose = require("mongoose");


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
