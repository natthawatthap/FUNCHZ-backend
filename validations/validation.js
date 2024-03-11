const { body, validationResult } = require("express-validator");

exports.validateSignup = [
  body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

exports.validateSignin = [
  body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

exports.validateCreateAccommodation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("address").notEmpty().withMessage("Address is required"),
  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone("any", { strictMode: false })
    .withMessage("Invalid phone number"),

];

exports.validateCreateRoom = [
  body("accommodation").notEmpty().withMessage("Accommodation ID is required"),
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("type").notEmpty().withMessage("Type is required"),
  body("pricePerNight")
    .notEmpty()
    .withMessage("Price per night is required")
    .isNumeric()
    .withMessage("Price per night must be a number"),

];

exports.validateCreateBooking = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
    body("phoneNumber").notEmpty().withMessage("Phone number is required"),
    body("checkinDate").notEmpty().withMessage("Check-in date is required"),
    body("checkoutDate").notEmpty().withMessage("Checkout date is required"),

  ];