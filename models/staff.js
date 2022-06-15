const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const staffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      maxlength: 11,
      minlength: 11,
    },
    mobile2: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      maxlength: 11,
      minlength: 11,
    },
    branch: {
      type: ObjectId,
      ref: 'Branch',
      required: true,
    },
    emplyeeID: {
      type: String,
      trim: true,
      unique: true,
      maxlength: 50,
    },
    role: {
      type: ObjectId,
      ref: 'Role',
      required: true,
    },

    accountType: {
      type: ObjectId,
      ref: 'AccountType',
      required: true,
    },
    enabled: {
      type: Boolean,
      required: true,
      default: true
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      maxlength: 200,
    },
    salary: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);
// virtual field
staffSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

staffSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    } catch (err) {
      return '';
    }
  },
};

module.exports = mongoose.model('Staff', staffSchema);
