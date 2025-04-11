const mongoose = require("mongoose")

const PaymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  customerPhone: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["card", "bank", "mobile"],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed", "refunded"],
    default: "pending",
  },
  cardDetails: {
    cardNumber: String,
    cardName: String,
    expiry: String,
  },
  bankDetails: {
    accountName: String,
    bankName: String,
    accountNumber: String,
  },
  mobileDetails: {
    provider: String,
    number: String,
  },
  transactionReference: String,
  paystackReference: String,
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
PaymentSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

module.exports = mongoose.models.Payment || mongoose.model("Payment", PaymentSchema)

