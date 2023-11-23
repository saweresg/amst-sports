// const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  slots: {
    type: [Number],
    required: true,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
