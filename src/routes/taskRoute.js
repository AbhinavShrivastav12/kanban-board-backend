const express = require("express");
const { AppDataSource } = require("../app");
const router = express.Router();

const TaskRepository = AppDataSource.getRepository("Tasks");

// Create Task
router.post("/tasks", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = TaskRepository.create({ title, description, status });
    await TaskRepository.save(task);
    res.status(201).json(task);
  } catch (error) {
    console.error("Failed to create task", error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Get All Tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await TaskRepository.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Failed to fetch tasks", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Get Task by ID
router.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskRepository.findOne({ where: { id } });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    console.error("Failed to fetch task", error);
    res.status(500).json({ error: "Failed to fetch task" });
  }
});

// Update Task
router.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const task = await TaskRepository.findOne({ where: { id } });
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    await TaskRepository.save(task);
    res.status(200).json(task);
  } catch (error) {
    console.error("Failed to update task", error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// Delete Task
router.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskRepository.findOne({ where: { id } });
    if (!task) return res.status(404).json({ error: "Task not found" });

    await TaskRepository.remove(task);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Failed to delete task", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;
