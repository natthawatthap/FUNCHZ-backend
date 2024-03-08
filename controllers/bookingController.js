const Booking = require("../models/booking");

// Controller function to create a new booking
exports.createBooking = async (req, res) => {
  try {
    const {
      user,
      accommodation,
      room,
      checkinDate,
      checkoutDate
    } = req.body;

    // Create a new booking instance
    const booking = new Booking({
      user,
      accommodation,
      room,
      checkinDate,
      checkoutDate
    });

    // Save the booking to the database
    await booking.save();

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "An error occurred while creating booking" });
  }
};
