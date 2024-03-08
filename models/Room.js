const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  accommodation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Accommodation",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Single", "Double", "Suite"],
    required: true,
  },
  pricePerNight: {
    type: Number,
    required: true,
  },
  amenities: [String],
  images: [
    {
      type: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
