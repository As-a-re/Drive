const mongoose = require("mongoose")

const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fullDescription: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["beginner", "intermediate", "advanced", "specialized"],
    required: true,
  },
  vehicle: {
    type: String,
    enum: ["manual", "automatic", "both"],
    required: true,
  },
  image: {
    type: String,
    default: "/placeholder.svg?height=300&width=600",
  },
  popular: {
    type: Boolean,
    default: false,
  },
  features: [String],
  curriculum: [
    {
      title: String,
      description: String,
    },
  ],
  instructors: [
    {
      name: String,
      role: String,
      experience: String,
      image: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Update the updatedAt field on save
LessonSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

module.exports = mongoose.models.Lesson || mongoose.model("Lesson", LessonSchema)

