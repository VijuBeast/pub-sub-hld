const redis = require("redis");

// Create a persistent Redis client (do not re-create on each function call)
const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  },
});

redisClient.on("connect", () => console.log("Connected to Redis"));
redisClient.on("error", (err) => console.error("Redis error:", err));
redisClient.on("end", () => console.error("Redis connection closed unexpectedly."));

// Function to publish messages safely
exports.publishToRedis = async (channel, message) => {
  try {
    console.log("Publishing to Redis:", { channel, message });

    // Ensure the client is connected before publishing
    if (!redisClient.isOpen) {
      console.error("Redis is not connected. Attempting to reconnect...");
      await redisClient.connect();
    }

    await redisClient.publish(channel, JSON.stringify(message));
    console.log("Message published successfully.");
  } catch (error) {
    console.error("Error publishing to Redis:", error);
  }
};
