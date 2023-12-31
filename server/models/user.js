// const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    bookings: {
      type: Object,
      default: {},
      // required: true
    },
  },
  { minimize: false }
);

module.exports = mongoose.model("User", userSchema);
