const express = require("express");
const Task = require("../models/Task");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Middleware to verify token
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.userId = decoded.userId;
    next();
  });
};

router.use(authenticate);

router.post("/", async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const findtask = await Task.findOne({ title });
    if (findtask) {
      res.status(201).json({ error: "Task already exists" });
    }
    const task = new Task({ user: req.userId, title, description, category });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    // Extract task ID from URL parameters
    const { id } = req.params;

    // Find the task by ID and ensure it belongs to the authenticated user
    const task = await Task.findOne({ _id: id, user: req.userId });

    // Check if the task was found
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Respond with the found task
    res.json(task);
  } catch (err) {
    // Handle any errors that occurred
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, description, completed, category } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, completed, category },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
