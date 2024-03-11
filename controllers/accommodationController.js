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
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 documents per page if not provided
    const sortBy = req.query.sortBy || "createdAt"; // Default to sorting by createdAt field if not provided
    const sortOrder = req.query.sortOrder || "desc"; // Default to descending order if not provided

    // Calculate skip value based on page and limit
    const skip = (page - 1) * limit;

    // Create sort object based on sortBy and sortOrder
    const sort = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Query accommodations with pagination and sorting
    const accommodationsPromise = Accommodation.find({})
      .sort(sort)
      .skip(skip)
      .limit(limit);

    // Count total accommodations
    const totalAccommodationsPromise = Accommodation.countDocuments({});

    // Wait for both promises to resolve
    const [accommodations, totalAccommodations] = await Promise.all([
      accommodationsPromise,
      totalAccommodationsPromise
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
