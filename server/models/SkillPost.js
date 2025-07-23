// models/SkillPost.js
const mongoose = require("mongoose");

const SkillPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  tags: [String],
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: { type: Number, default: 0 },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SkillPost", SkillPostSchema);
