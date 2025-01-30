const { connectMongoDB } = require("./config/db.js");
const { startSubscriber } = require("./subscribers/redisSubscriber.js");

(async () => {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Start the Redis subscriber
    startSubscriber();

    console.log("Listener service is running...");
  } catch (error) {
    console.error("Error starting the service:", error);
    process.exit(1);
  }
})();
