const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tasks: [{ type: mongoose.Types.ObjectId, required: true, ref: "Task" }],
});

module.exports = mongoose.model("List", listSchema);
