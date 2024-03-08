const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require('./configs/db');
const userRouter = require('./routers/userRouter');
const app = express();


// Middleware
app.use(bodyParser.json());
app.use(cors());

connectDB();


app.use("/api/user", userRouter);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
