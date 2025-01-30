const redis = require("redis");
const { processMessage } = require("../processors/messageProcessor.js");

// const redisClient = redis.createClient({
//   host: process.env.REDIS_HOST || "localhost",
//   port: process.env.REDIS_PORT || 6380,
// });

// const redisClient = redis.createClient({
//   socket: {
//     host: process.env.REDIS_HOST || "redis",
//     port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
//   },
// });

// redisClient.on("error", (err) => console.error("Redis error:", err));

// exports.startSubscriber = () => {
//   redisClient.subscribe("user_channel", (err) => {
//     if (err) {
//       console.error("Failed to subscribe to Redis channel:", err);
//       process.exit(1);
//     }
//     console.log("Subscribed to Redis channel: user_channel");
//   });

//   redisClient.on("message", async (channel, message) => {
//     console.log(`Received message from ${channel}:`, message);
//     try {
//       const data = JSON.parse(message);
//       await processMessage(data);
//     } catch (err) {
//       console.error("Error processing message:", err);
//     }
//   });
// };


// exports.startSubscriber = async () => {
//   try {
//     // Connect to Redis before subscribing
//     await redisClient.connect();
//     console.log("Listener connected to Redis!");

//     // Subscribe to channel
//     await redisClient.subscribe("user_channel", (message) => {
//       console.log("Received message from user_channel:", message);
//       try {
//         const data = JSON.parse(message);
//         processMessage(data);
//       } catch (err) {
//         console.error("Error processing message:", err);
//       }
//     });

//     console.log("Subscribed to Redis channel: user_channel");
//   } catch (error) {
//     console.error("Error connecting to Redis:", error);
//     process.exit(1);
//   }
// };

const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || "redis",
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  },
});

redisClient.on("error", (err) => console.error("Redis error:", err));

exports.startSubscriber = async () => {
  try {
    await redisClient.connect();
    console.log("Listener connected to Redis!");

    await redisClient.subscribe("user_channel", async (message) => {
      console.log("Received message from user_channel:", message);
      try {
        const data = JSON.parse(message);
        await processMessage(data);
      } catch (err) {
        console.error("Error processing message:", err);
      }
    });

    console.log("Subscribed to Redis channel: user_channel");
  } catch (error) {
    console.error("Error connecting to Redis:", error);
    process.exit(1);
  }
};

