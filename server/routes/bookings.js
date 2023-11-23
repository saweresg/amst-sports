const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
// const booking = require('../models/booking')

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

// Getting All
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Getting One
router.get("/:date", getBooking, (req, res) => {
  try {
    res.json(res.booking);
  } catch (err) {
    res.json([]);
    // res.status(400).json({ message: err.message })
  }
});

//Creating One
router.post("/", async (req, res) => {
  const booking = new Booking({
    date: req.body.date,
    slots: req.body.slots,
  });
  try {
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Updating One
router.patch("/:date", async (req, res) => {
  let booking;
  try {
    booking = await Booking.findOne({ date: req.params.date });

    if (booking) {
      // var newSlots = res.booking.slots.concat(req.body.slots).sort();
      // Booking.findOneAndUpdate({date : req.params.date}, )
      res.booking = booking;
      if (req.body.date != null) {
        res.booking.date = req.body.date;
      }
      if (req.body.slots != null) {
        res.booking.slots = res.booking.slots.concat(req.body.slots);
      }

      const updatedBooking = await res.booking.save();
      res.json(updatedBooking);
    } else {
      const booking = new Booking({
        date: req.params.date,
        slots: req.body.slots,
      });
      const newBooking = await booking.save();
      res.status(201).json(newBooking);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

  // res.json({body: req.body})
});

//Deleting One
router.delete("/:date", getBooking, async (req, res) => {
  try {
    await res.booking.deleteOne();
    res.json({ message: "removed booking" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//mi
async function getBooking(req, res, next) {
  let booking;
  try {
    booking = await Booking.findOne({ date: req.params.date });
    if (booking == null) {
      booking = [];
      // return res.status(404).json({ message: 'cannot find booking' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.booking = booking;
  next();
}

module.exports = router;
