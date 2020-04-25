const mongoose = require("mongoose");

const newJobTitleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100
        },

        note: {
          type: String,
          trim: true,
          maxlength: 200
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("NewJobTitle", newJobTitleSchema);
