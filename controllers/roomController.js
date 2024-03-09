const Room = require("../models/room");
const upload = require("../middlewares/uploads");

// Controller function to create a new room
exports.createRoom = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        console.error("Error uploading images:", err);
        return res.status(400).json({ message: err });
      }

      const {
        accommodation,
        name,
        description,
        type,
        pricePerNight,
        amenities
      } = req.body;

      // Extract the paths of uploaded images from the request
      const images = req.files.map(file => file.path);

      // Ensure required fields are provided
      if (!accommodation || !name || !type || !pricePerNight) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Create a new room instance
      const room = new Room({
        accommodation,
        name,
        description,
        type,
        pricePerNight,
        amenities,
        images
      });

      // Save the room to the database
      await room.save();

      res.status(201).json({ message: "Room created successfully", room });
    });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ message: "An error occurred while creating room" });
  }
};


exports.getRoomsByAccommodationId = async (req, res) => {
  try {
    const accommodationId = req.params.accommodationId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder || "desc";

    const skip = (page - 1) * limit;

    const sort = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    const query = { accommodation: accommodationId };

    const totalRooms = await Room.countDocuments(query);
    const rooms = await Room.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      total: totalRooms,
      rooms,
    });
  } catch (error) {
    console.error("Error fetching rooms by accommodation ID:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json({ room });
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};