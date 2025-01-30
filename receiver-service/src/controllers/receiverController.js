const { saveToDatabase } = require("../models/receiverModel.js");
const { publishToRedis } = require("../publishers/redisPublisher.js");
const { v4: uuidv4 } = require("uuid");

exports.handleReceiver = async (req, res) => {
  try {
    const { user, class: userClass, age, email } = req.body;

    // Basic Validation
    if (!user || !userClass || !age || !email) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Save to MongoDB
    const data = {
      id: uuidv4(),
      user,
      class: userClass,
      age,
      email,
      inserted_at: new Date().toISOString(),
    };
    await saveToDatabase(data);

    // Publish to Redis
    await publishToRedis("user_channel", data);

    return res.status(201).json({ message: "Data saved and published successfully.", data });
  } catch (error) {
    console.error("Error in /receiver:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

