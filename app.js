const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require('./configs/database');
const logger = require('./configs/logger'); 
require('dotenv').config();
const app = express();


// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  logger.info(`${ip} - ${req.method} ${req.url}`);
  next();
});

connectDB();

app.use("/uploads", express.static("uploads"));
app.use("/api", require('./routers/router'));

app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy");
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
