var mongoose = require("mongoose");
const crypto = require("crypto");
const {v1: uuidv1} = require("uuid");

var Schema = mongoose.Schema;

var user_schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 40,
      trim: true,
    },

    encrypted_password: {
      type: String,
      required: true,
    },
    salt: String,
    score: [],
    totalscore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// virtual field
user_schema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encrypted_password = this.getSecurePassword(password);
  })
  .get(function () {
    return this._password;
  });

user_schema.methods = {
  getSecurePassword: function (userpassword) {
    if (!userpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(userpassword)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
  authenticate: function (userpassword) {
    return this.getSecurePassword(userpassword) === this.encrypted_password;
  },
};

module.exports = mongoose.model("User", user_schema);
