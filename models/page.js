const mongoose = require("mongoose");


const pagePermisionsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
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
const pageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            maxlength: 32
        },
        page1: pagePermisionsSchema,
        page2: pagePermisionsSchema,
        page3: pagePermisionsSchema,
        page4: pagePermisionsSchema,
        page5: pagePermisionsSchema,
        page6: pagePermisionsSchema,
        page7: pagePermisionsSchema,
        page8: pagePermisionsSchema,
        page9: pagePermisionsSchema,
        page10: pagePermisionsSchema,
        page11: pagePermisionsSchema,

    },
    { timestamps: true }
);
module.exports = mongoose.model("Page", pageSchema);
