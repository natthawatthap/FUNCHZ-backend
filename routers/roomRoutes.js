const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");

// Route to create a new room
router.post("/", roomController.createRoom);
router.get("/:accommodationId", roomController.getRoomsByAccommodationId);
module.exports = router;
