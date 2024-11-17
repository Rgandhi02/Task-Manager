const express = require("express");
const router = express.Router();

const db = require("../db"); // Import MySQL connection pool

// Add Task
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  try {
    const [result] = await db.execute(
      "INSERT INTO tasks (title, description) VALUES (?, ?)",
      [title, description]
    );
    res.json({ id: result.insertId, title, description });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// View All Tasks
router.get("/", async (req, res) => {
  try {
    const [tasks] = await db.execute("SELECT * FROM tasks");
    console.log("Fetched tasks from DB:", tasks); // Debugging the tasks from DB

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Task
router.put("/:id", async (req, res) => {
  const { id } = req.params; // Task ID from URL
  const { title, description } = req.body; // Updated data from the request body
  console.log("Task ID in PUT request:", id);  // Add logging

  try {
    const [result] = await db.execute(
      "UPDATE tasks SET title = ?, description = ? WHERE id = ?",
      [title, description, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Task
router.delete("/:id", async (req, res) => {
  const { id } = req.params; // Task ID from URL
  console.log("Task ID in DELETE request:", id);  // Add logging
  try {
    const [result] = await db.execute("DELETE FROM tasks WHERE id = ?", [parseInt(id, 10)]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
