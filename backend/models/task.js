const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  // date: { type: Date, required: false },
  tag: { type: String, required: false },
  date: { type: String, required: false },
  timestamp: { type: Date, required: true },
  isDone: { type: Boolean, required: true },
  owningList: { type: mongoose.Types.ObjectId, required: true, ref: "List" },
});

module.exports = mongoose.model("Task", taskSchema);
