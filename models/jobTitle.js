const mongoose = require("mongoose");
const Page = require('../models/page');

const jobTitleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100
        },

        icon: {
            type: String,
            trim: true,
            maxlength: 200
        },
        deletable: {
            type: Boolean,
            default: false
        },

        pages: [Page.schema]
    },
    { timestamps: true }
);

module.exports = mongoose.model("JobTitle", jobTitleSchema);
