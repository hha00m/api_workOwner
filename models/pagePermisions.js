const mongoose = require("mongoose");

const pagePermisionsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 56
        },
        update: {
            type: Boolean,
            default: true
        },
        remove: {
            type: Boolean,
            default: true
        },
        create: {
            type: Boolean,
            default: true
        },
        read: {
            type: Boolean,
            default: true
        },
        list: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("PagePermisions", pagePermisionsSchema);
