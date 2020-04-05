const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            unique:true,
            maxlength: 32
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Role", roletSchema);
