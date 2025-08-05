import pool from "../db.js"

export const getAllTasks = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tasks ORDER BY created_at DESC")
    res.json(rows)
  } catch (error) {
    console.error("Error fetching tasks:", error)
    res.status(500).json({ message: "Server error" })
  }
}

export const createTask = async (req, res) => {
  const { title, description } = req.body
  if (!title) {
    return res.status(400).json({ message: "Title is required" })
  }
  try {
    const [result] = await pool.query("INSERT INTO tasks (title, description) VALUES (?, ?)", [title, description])
    res.status(201).json({ id: result.insertId, title, description, completed: false })
  } catch (error) {
    console.error("Error creating task:", error)
    res.status(500).json({ message: "Server error" })
  }
}

export const updateTask = async (req, res) => {
  const { id } = req.params
  const { title, description, completed } = req.body
  try {
    const [result] = await pool.query("UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?", [
      title,
      description,
      completed,
      id,
    ])
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" })
    }
    res.json({ id, title, description, completed })
  } catch (error) {
    console.error("Error updating task:", error)
    res.status(500).json({ message: "Server error" })
  }
}

export const deleteTask = async (req, res) => {
  const { id } = req.params
  try {
    const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [id])
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" })
    }
    res.status(204).send() // No content
  } catch (error) {
    console.error("Error deleting task:", error)
    res.status(500).json({ message: "Server error" })
  }
}
