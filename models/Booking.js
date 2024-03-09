const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  accommodationId: { type: mongoose.Schema.Types.ObjectId, ref: "Accommodation", required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: {type: String,required: true },
  checkinDate: { type: Date, required: true },
  checkoutDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

// bookingSchema.pre("save", async function (next) {
//   try {
//     // Check if the room is available for the requested dates
//     const bookings = await this.model("Booking").find({
//       room: this.room,
//       $or: [
//         { checkinDate: { $lt: this.checkoutDate }, checkoutDate: { $gt: this.checkinDate } }, // Check if dates overlap
//         { checkinDate: { $gte: this.checkoutDate } }, // Check if the new booking starts after existing bookings end
//         { checkoutDate: { $lte: this.checkinDate } }, // Check if the new booking ends before existing bookings start
//       ],
//     });

//     if (bookings.length > 0) {
//       throw new Error("Room is already booked for the requested dates.");
//     }

//     next();
//   } catch (error) {
//     next(error);
//   }
// });

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
