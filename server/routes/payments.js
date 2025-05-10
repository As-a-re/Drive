const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Enrollment = require('../models/Enrollment');
const paystack = require('../utils/paystack');

// Initialize payment
router.post('/initialize', async (req, res) => {
  try {
    const { amount, email, metadata } = req.body;
    
    const response = await paystack.initializeTransaction({
      amount: amount * 100,
      email,
      metadata,
      currency: 'GHS',
    });

    res.json(response.data);
  } catch (error) {
    console.error('Payment initialization error:', error);
    res.status(500).json({ error: 'Failed to initialize payment' });
  }
});

// Verify payment
router.get('/verify/:reference', async (req, res) => {
  try {
    const { reference } = req.params;
    const response = await paystack.verifyTransaction(reference);

    if (response.data.status === 'success') {
      // Update payment record
      const payment = await Payment.findOneAndUpdate(
        { reference },
        { status: 'completed' },
        { new: true }
      );

      // Update enrollment status
      if (payment) {
        await Enrollment.findOneAndUpdate(
          { paymentId: payment._id },
          { status: 'confirmed' }
        );
      }
    }

    res.json(response.data);
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});

// Get all payments
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find()
      .sort({ createdAt: -1 })
      .populate('lessonId')
      .populate('userId');
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});

// Get payment by ID
router.get('/:id', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('lessonId')
      .populate('userId');
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payment' });
  }
});

module.exports = router;