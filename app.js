const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require('./configs/db');

const app = express();


// Middleware
app.use(bodyParser.json());
app.use(cors());

connectDB();

app.use("/uploads", express.static("uploads"));
app.use("/api/user", require('./routers/userRouter'));
app.use("/api/accommodation", require('./routers/accommodationRoutes'));
app.use("/api/room", require('./routers/roomRoutes'));
app.use("/api/booking", require('./routers/bookingRoutes'));

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
