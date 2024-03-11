const Accommodation = require("../models/accommodation");
const upload = require("../middlewares/uploads");


exports.createAccommodation = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    upload(req, res, async function (err) {
      if (err) {
        console.error("Error uploading images:", err);
        return res.status(400).json({ message: err });
      }

      const {
        name,
        description,
        address,
        phoneNumber,
        amenities,
        rate,
      } = req.body;

      // Extract the paths of uploaded images from the request
      const images = req.files.map((file) => file.path);

      // Create a new accommodation instance
      const accommodation = new Accommodation({
        name,
        description,
        address,
        phoneNumber,
        amenities,
        rate,
        images,
      });

      // Save the accommodation to the database
      await accommodation.save();

      res
        .status(201)
        .json({ message: "Accommodation created successfully", accommodation });
    });
  } catch (error) {
    console.error("Error creating accommodation:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating accommodation" });
  }
};


exports.getAccommodations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder || "desc";
    const search = req.query.search || ""; 

    const skip = (page - 1) * limit;
    const sort = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Define search criteria based on the 'search' query parameter
    const searchCriteria = {
      $or: [
        { name: { $regex: search, $options: "i" } }, // Case-insensitive search by name
        { description: { $regex: search, $options: "i" } }, // Case-insensitive search by description
      ],
    };

    // Query accommodations with pagination, sorting, and search criteria
    const accommodationsPromise = Accommodation.find(searchCriteria)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    // Count total accommodations matching search criteria
    const totalAccommodationsPromise = Accommodation.countDocuments(searchCriteria);

    const [accommodations, totalAccommodations] = await Promise.all([
      accommodationsPromise,
      totalAccommodationsPromise,
    ]);

    res.status(200).json({
      total: totalAccommodations,
      accommodations,
    });
  } catch (error) {
    console.error("Error fetching accommodations:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// Controller function to get an accommodation by its ID
exports.getAccommodationById = async (req, res) => {
  try {
    const accommodationId = req.params.accommodationId;

    // Find accommodation by ID
    const accommodation = await Accommodation.findById(accommodationId);

    if (!accommodation) {
      return res.status(404).json({ message: "Accommodation not found" });
    }

    res.status(200).json({ accommodation });
  } catch (error) {
    console.error("Error fetching accommodation by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
