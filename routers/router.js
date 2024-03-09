const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const userController = require("../controllers/userController");
const accommodationController = require("../controllers/accommodationController");
const roomController = require("../controllers/roomController");
const bookingController = require("../controllers/bookingController");

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.signup
);

router.post(
  "/signin",
  body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
  userController.signin
);

router.post("/accommodation", accommodationController.createAccommodation);
router.get("/accommodations", accommodationController.getAccommodations);
router.get(
  "/accommodation/:accommodationId",
  accommodationController.getAccommodationById
);

router.post("/room", roomController.createRoom);
router.get("/rooms/:accommodationId", roomController.getRoomsByAccommodationId);
router.get("/room/:roomId", roomController.getRoomById);

router.post("/booking", bookingController.createBooking);
router.get("/booking/:roomId", bookingController.getBookingsByRoomId);

module.exports = router;
