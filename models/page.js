const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


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
const pageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        page1: {
            type: ObjectId,
            ref: 'PagePermisions',
        },
        page2: {
            type: ObjectId,
            ref: 'PagePermisions',
        },
        page3: {
            type: ObjectId,
            ref: 'PagePermisions',
        },
        page4: {
            type: ObjectId,
            ref: 'PagePermisions',
        },
        page5: {
            type: ObjectId,
            ref: 'PagePermisions',
        },
        page6: {
            type: ObjectId,
            ref: 'PagePermisions',
        },
        page7: {
            type: ObjectId,
            ref: 'PagePermisions',
        },
        page8: {
            type: ObjectId,
            ref: 'PagePermisions',
        },
        page9: {
            type: ObjectId,
            ref: 'PagePermisions',
        },
        page10: {
            type: ObjectId,
            ref: 'PagePermisions',
        },
        page11: {
            type: ObjectId,
            ref: 'PagePermisions',
        },

    },
    { timestamps: true }
);
module.exports = mongoose.model("Page", pageSchema);
