const express = require("express")
const next = require("next")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

// Load environment variables
dotenv.config()

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/driving-school"

// Import routes
const paymentsRoutes = require("./routes/payments")

// Models
const Enrollment = require("./models/Enrollment")
const User = require("./models/User")
const Lesson = require("./models/Lesson")

app
  .prepare()
  .then(() => {
    const server = express()

    // Middleware
    server.use(cors())
    server.use(bodyParser.json())

    // Connect to MongoDB
    mongoose
      .connect(MONGODB_URI)
      .then(() => console.log("Connected to MongoDB"))
      .catch((err) => console.error("MongoDB connection error:", err))

    // API Routes
    server.use("/api/payments", paymentsRoutes)

    // Lessons API
    server.get("/api/lessons", async (req, res) => {
      try {
        const lessons = await Lesson.find()
        res.status(200).json({ success: true, data: lessons })
      } catch (error) {
        console.error("Error fetching lessons:", error)
        res.status(500).json({ success: false, message: "Failed to fetch lessons" })
      }
    })

    server.get("/api/lessons/:id", async (req, res) => {
      try {
        const lesson = await Lesson.findById(req.params.id)
        if (!lesson) {
          return res.status(404).json({ success: false, message: "Lesson not found" })
        }
        res.status(200).json({ success: true, data: lesson })
      } catch (error) {
        console.error("Error fetching lesson:", error)
        res.status(500).json({ success: false, message: "Failed to fetch lesson" })
      }
    })

    // Enrollments API
    server.get("/api/enrollments", async (req, res) => {
      try {
        // This would typically be protected and filtered by user
        const enrollments = await Enrollment.find().populate("lessonId").populate("paymentId")
        res.status(200).json({ success: true, data: enrollments })
      } catch (error) {
        console.error("Error fetching enrollments:", error)
        res.status(500).json({ success: false, message: "Failed to fetch enrollments" })
      }
    })

    server.get("/api/users/:userId/enrollments", async (req, res) => {
      try {
        const enrollments = await Enrollment.find({ userId: req.params.userId })
          .populate("lessonId")
          .populate("paymentId")

        if (!enrollments.length) {
          return res.status(404).json({ success: false, message: "No enrollments found for this user" })
        }

        res.status(200).json({ success: true, data: enrollments })
      } catch (error) {
        console.error("Error fetching user enrollments:", error)
        res.status(500).json({ success: false, message: "Failed to fetch user enrollments" })
      }
    })

    // User API
    server.get("/api/users/:id", async (req, res) => {
      try {
        const user = await User.findById(req.params.id)
        if (!user) {
          return res.status(404).json({ success: false, message: "User not found" })
        }
        res.status(200).json({ success: true, data: user })
      } catch (error) {
        console.error("Error fetching user:", error)
        res.status(500).json({ success: false, message: "Failed to fetch user" })
      }
    })

    // Next.js handler for all other routes
    server.all("*", (req, res) => {
      return handle(req, res)
    })

    const PORT = process.env.PORT || 3000
    server.listen(PORT, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${PORT}`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })

