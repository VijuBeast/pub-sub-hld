const mongoose = require("mongoose");

exports.connectMongoDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/receiver";
    await mongoose.connect(mongoURI, { });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

