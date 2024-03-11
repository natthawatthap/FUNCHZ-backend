const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const userController = require("../controllers/userController");
const accommodationController = require("../controllers/accommodationController");
const roomController = require("../controllers/roomController");
const bookingController = require("../controllers/bookingController");
const validation = require("../validations/validation");

router.post("/signup", validation.validateSignup, userController.signup);

router.post("/signin", validation.validateSignin, userController.signin);

router.get("/user", auth, userController.getUser);

router.post(
  "/accommodation",
  validation.validateCreateAccommodation,
  accommodationController.createAccommodation
);
router.get("/accommodations", accommodationController.getAccommodations);
router.get(
  "/accommodation/:accommodationId",
  accommodationController.getAccommodationById
);

router.post("/room", validation.validateCreateRoom, roomController.createRoom);
router.get("/rooms/:accommodationId", roomController.getRoomsByAccommodationId);
router.get("/room/:roomId", roomController.getRoomById);

router.post(
  "/booking",
  auth,
  validation.validateCreateBooking,
  bookingController.createBooking
);
router.get("/booking/:roomId", bookingController.getBookingsByRoomId);

module.exports = router;
