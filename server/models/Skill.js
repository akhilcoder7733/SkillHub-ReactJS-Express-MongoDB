const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"] },
  experience: { type: String }, // e.g., "2 years"
  tools: [{ type: String }],
  tags: [{ type: String }],
  projectLink: { type: String },
  location: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Skill", skillSchema);
