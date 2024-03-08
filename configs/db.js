// db.js

const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://localhost:27017/FUNCHZ-backend";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
