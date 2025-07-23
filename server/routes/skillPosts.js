const express = require("express");
const router = express.Router();
const Skill = require("../models/Skill");
const auth = require("../middleware/authMiddleware");

// POST a new skill (Private)
router.post("/", auth, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      level,
      experience,
      tools,
      tags,
      projectLink,
      location,
    } = req.body;

    if (!title || !category) {
      return res.status(400).json({ message: "Title and category required" });
    }

    const skill = new Skill({
      title,
      description,
      category,
      level,
      experience,
      tools,
      tags,
      projectLink,
      location,
      user: req.user._id,
    });

    await skill.save();
    res.status(201).json(skill);
  } catch (err) {
    console.error("Skill Post Error:", err.message);
    res.status(500).json({ message: "Failed to post skill" });
  }
});


// ✅ UPDATED: GET skills by logged-in user (Private)
router.get("/me", auth, async (req, res) => {
  try {
    const mySkills = await Skill.find({ user: req.user._id })
      .populate("user", "name email") // 👈 this line is added
      .sort({ createdAt: -1 });

    res.json(mySkills);
  } catch (err) {
    console.error("Fetch My Skills Error:", err.message);
    res.status(500).json({ message: "Failed to fetch your skills" });
  }
});

// GET all public skills (Public)
router.get("/", async (req, res) => {
  try {
    const allSkills = await Skill.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(allSkills);
  } catch (err) {
    console.error("Fetch Public Skills Error:", err.message);
    res.status(500).json({ message: "Failed to fetch skills" });
  }
});

// DELETE a skill by ID (Private)
router.delete("/:id", auth, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) return res.status(404).json({ message: "Skill not found" });
    if (skill.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    await skill.deleteOne(); // ✅ Proper deletion in Mongoose v7+
    res.json({ message: "Skill deleted successfully" });
  } catch (err) {
    console.error("Delete Skill Error:", err.message);
    res.status(500).json({ message: "Failed to delete skill" });
  }
});


// GET a skill by ID (Private)
router.get("/:id", auth, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });

    if (skill.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json(skill);
  } catch (err) {
    console.error("Get Skill by ID Error:", err.message);
    res.status(500).json({ message: "Failed to fetch skill" });
  }
});

// ✅ PUT update a skill by ID (Private)
router.put("/:id", auth, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) return res.status(404).json({ message: "Skill not found" });

    if (skill.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const {
      title,
      description,
      category,
      level,
      experience,
      tools,
      tags,
      projectLink,
      location,
    } = req.body;

    skill.title = title || skill.title;
    skill.description = description || skill.description;
    skill.category = category || skill.category;
    skill.level = level || skill.level;
    skill.experience = experience || skill.experience;
    skill.tools = tools || skill.tools;
    skill.tags = tags || skill.tags;
    skill.projectLink = projectLink || skill.projectLink;
    skill.location = location || skill.location;

    const updatedSkill = await skill.save();
    res.json(updatedSkill);
  } catch (err) {
    console.error("Update Skill Error:", err.message);
    res.status(500).json({ message: "Failed to update skill" });
  }
});



module.exports = router;
