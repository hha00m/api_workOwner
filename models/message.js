const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    order: { type: ObjectId, ref: 'Order', required: true },
    staff: { type: ObjectId, ref: 'Staff', required: true },
    client: { type: ObjectId, ref: 'Client', required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Message', messageSchema);
