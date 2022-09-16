const mongoose = require("mongoose");
const Transiction = require("./transiction");

const ClientStatementSchema = new mongoose.Schema(
    {
        client: {
            type: ObjectId,
            ref: 'Client',
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
module.exports = mongoose.model("ClientStatement", ClientStatementSchema);
