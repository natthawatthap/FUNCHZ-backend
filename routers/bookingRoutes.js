const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// Route to create a new booking
router.post("/", bookingController.createBooking);

module.exports = router;
