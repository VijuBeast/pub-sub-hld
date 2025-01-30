const express = require("express");
const bodyParser = require("body-parser");
const { connectMongoDB } = require("./config/db.js");

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
const receiverRoute = require("./routes/receiver.js");
app.use("/receiver", receiverRoute);

// Connect to MongoDB
connectMongoDB();

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Receiver service running on port ${PORT}`));
