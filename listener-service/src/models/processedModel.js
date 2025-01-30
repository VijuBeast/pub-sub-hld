const mongoose = require("mongoose");

const processedSchema = new mongoose.Schema({
  id: { type: String, required: true },
  user: { type: String, required: true },
  class: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  inserted_at: { type: Date, required: true },
  modified_at: { type: Date, required: true },
});

const Processed = mongoose.model("Processed", processedSchema);

exports.saveToDatabase = async (data) => {
  const processed = new Processed(data);
  await processed.save();
};
