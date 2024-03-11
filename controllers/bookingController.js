const Booking = require("../models/booking");
const { validationResult } = require('express-validator');

exports.createBooking = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.userId;
    const {
      accommodationId,
      roomId,
      name,
      email,
      phoneNumber,
      checkinDate,
      checkoutDate,
    } = req.body;

    // Create a new booking instance
    const booking = new Booking({
      userId,
      accommodationId,
      roomId,
      name,
      email,
      phoneNumber,
      checkinDate,
      checkoutDate,
    });

    // Save the booking to the database
    await booking.save();

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating booking" });
  }
};


exports.getBookingsByRoomId = async (req, res) => {
  try {
    const roomId = req.params.roomId; // Get room ID from request parameters

    // Query bookings by room ID and select only checkinDate and checkoutDate
    const bookings = await Booking.find({ roomId: roomId }).select(
      "checkinDate checkoutDate"
    );

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings by room ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
