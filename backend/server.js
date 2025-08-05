import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import taskRoutes from "./routes/tasks.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors()) // Enable CORS for all origins
app.use(express.json()) // Parse JSON request bodies

// Routes
app.use("/api/tasks", taskRoutes)

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Task Tracker Backend API is running!")
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
