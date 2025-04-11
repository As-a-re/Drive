const express = require("express")
const router = express.Router()
const Payment = require("../models/Payment")
const Enrollment = require("../models/Enrollment")
const paystack = require("../utils/paystack")

// Process a new payment
router.post("/", async (req, res) => {
  try {
    const paymentData = req.body

    // Validate required fields
    if (
      !paymentData.amount ||
      !paymentData.lessonId ||
      !paymentData.customerName ||
      !paymentData.customerEmail ||
      !paymentData.customerPhone
    ) {
      return res.status(400).json({ success: false, message: "Missing required payment information" })
    }

    // Validate payment method specific fields
    if (paymentData.paymentMethod === "card") {
      if (!paymentData.cardNumber || !paymentData.cardName || !paymentData.expiry || !paymentData.cvv) {
        return res.status(400).json({ success: false, message: "Missing required card information" })
      }
    } else if (paymentData.paymentMethod === "bank") {
      if (!paymentData.accountName || !paymentData.bankName || !paymentData.accountNumber) {
        return res.status(400).json({ success: false, message: "Missing required bank information" })
      }
    } else if (paymentData.paymentMethod === "mobile") {
      if (!paymentData.mobileProvider || !paymentData.mobileNumber) {
        return res.status(400).json({ success: false, message: "Missing required mobile money information" })
      }
    } else {
      return res.status(400).json({ success: false, message: "Invalid payment method" })
    }

    // Generate a unique reference
    const reference = `PAY-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    // In a real application, this is where you would:
    // 1. Connect to Paystack API to process the payment

    // For demonstration, we'll simulate a successful Paystack transaction
    // In production, you would use paystack.initializeTransaction() here

    // Create a new payment record
    const payment = new Payment({
      amount: paymentData.amount,
      lessonId: paymentData.lessonId,
      customerName: paymentData.customerName,
      customerEmail: paymentData.customerEmail,
      customerPhone: paymentData.customerPhone,
      paymentMethod: paymentData.paymentMethod,
      status: "completed",
      transactionReference: reference,
      // Payment method specific details
      ...(paymentData.paymentMethod === "card" && {
        cardDetails: {
          cardNumber: `**** **** **** ${paymentData.cardNumber.slice(-4)}`,
          cardName: paymentData.cardName,
          expiry: paymentData.expiry,
        },
      }),
      ...(paymentData.paymentMethod === "bank" && {
        bankDetails: {
          accountName: paymentData.accountName,
          bankName: paymentData.bankName,
          accountNumber: paymentData.accountNumber,
        },
      }),
      ...(paymentData.paymentMethod === "mobile" && {
        mobileDetails: {
          provider: paymentData.mobileProvider,
          number: paymentData.mobileNumber,
        },
      }),
    })

    await payment.save()

    // Create enrollment record
    const enrollment = new Enrollment({
      lessonId: paymentData.lessonId,
      lessonTitle: paymentData.lessonTitle,
      userId: paymentData.userId || null, // If user is logged in
      customerName: paymentData.customerName,
      customerEmail: paymentData.customerEmail,
      customerPhone: paymentData.customerPhone,
      date: paymentData.date,
      timeSlot: paymentData.timeSlot,
      vehicleType: paymentData.vehicleType,
      paymentId: payment._id,
      status: "confirmed",
    })

    await enrollment.save()

    // Return success response
    res.status(200).json({
      success: true,
      message: "Payment processed successfully",
      data: {
        paymentId: payment._id,
        enrollmentId: enrollment._id,
        amount: payment.amount,
        status: payment.status,
        reference,
      },
    })
  } catch (error) {
    console.error("Payment processing error:", error)
    res.status(500).json({ success: false, message: "An error occurred while processing the payment" })
  }
})

// Get all payments (admin only)
router.get("/", async (req, res) => {
  try {
    // This would typically be protected and only accessible to admins
    const payments = await Payment.find().sort({ createdAt: -1 })
    res.status(200).json({ success: true, data: payments })
  } catch (error) {
    console.error("Error fetching payments:", error)
    res.status(500).json({ success: false, message: "Failed to fetch payments" })
  }
})

// Get payment by ID
router.get("/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" })
    }
    res.status(200).json({ success: true, data: payment })
  } catch (error) {
    console.error("Error fetching payment:", error)
    res.status(500).json({ success: false, message: "Failed to fetch payment" })
  }
})

// Verify payment (webhook or manual verification)
router.post("/verify/:reference", async (req, res) => {
  try {
    const { reference } = req.params

    // In production, you would verify with Paystack
    // const verification = await paystack.verifyTransaction(reference);

    // For demonstration, we'll simulate a successful verification
    const payment = await Payment.findOne({ transactionReference: reference })

    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" })
    }

    // Update payment status if needed
    if (payment.status !== "completed") {
      payment.status = "completed"
      await payment.save()

      // Also update the enrollment status
      const enrollment = await Enrollment.findOne({ paymentId: payment._id })
      if (enrollment && enrollment.status === "pending") {
        enrollment.status = "confirmed"
        await enrollment.save()
      }
    }

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      data: {
        paymentId: payment._id,
        status: payment.status,
      },
    })
  } catch (error) {
    console.error("Payment verification error:", error)
    res.status(500).json({ success: false, message: "An error occurred while verifying the payment" })
  }
})

module.exports = router

