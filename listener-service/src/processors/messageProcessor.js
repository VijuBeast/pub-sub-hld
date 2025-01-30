const { saveToDatabase } = require("../models/processedModel.js");

exports.processMessage = async (data) => {
  console.log("Processing message:", data);

  const processedData = {
    ...data,
    modified_at: new Date().toISOString(),
  };

  // Save to MongoDB
  await saveToDatabase(processedData);
  console.log("Message processed and saved.");
};