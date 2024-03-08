const express = require("express");
const router = express.Router();
const accommodationController = require("../controllers/accommodationController");

// Route to create a new accommodation
router.post("/", accommodationController.createAccommodation);
router.get("/", accommodationController.getAccommodations);

module.exports = router;
