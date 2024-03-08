const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  amenities: [String],
  images: [
    {
      type: String,
    },
  ],
  rate: {
    type: [Number],
  },
  createdAt: { type: Date, default: Date.now },
});

const Accommodation = mongoose.model("Accommodation", accommodationSchema);

module.exports = Accommodation;
