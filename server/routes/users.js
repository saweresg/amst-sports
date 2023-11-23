const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

router.delete("/:email", getUser, async (req, res) => {
  try {
    await res.user.deleteOne();
    res.json({ message: "removed user" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:uid", getUser, (req, res) => {
  try {
    res.json(res.user.bookings);
  } catch (err) {
    // res.json([])
    res.status(400).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const user = new User({
    uid: req.body.uid,
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:uid", getUser, async (req, res) => {
  try {
    // if (req.body.bookings != null) {
    dates = Object.keys(req.body.bookings);
    dates.forEach((date) => {
      oldBookings = res.user.bookings[date];
      newBookings = req.body.bookings[date];
      if (oldBookings) {
        res.user.bookings[date] = oldBookings.concat(newBookings);
      } else {
        res.user.bookings[date] = newBookings;
      }
    });

    res.user.markModified("bookings");
    const updatedUser = await res.user.save();
    res.json(updatedUser);
    // }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findOne({ uid: req.params.uid });
    if (user == null) {
      return res.status(404).json({ message: "cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;
