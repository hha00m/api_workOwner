const mongoose = require("mongoose");
const Transiction = require("./transiction");
const { ObjectId } = mongoose.Schema;

const ClientStatementSchema = new mongoose.Schema(
    {
        client: {
            type: ObjectId,
            ref: 'Client',
        },
        store: {
            type: ObjectId,
            ref: 'Store',
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
