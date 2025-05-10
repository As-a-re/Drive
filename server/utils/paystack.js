const axios = require('axios');

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

const paystack = {
  initializeTransaction: async (data) => {
    try {
      const response = await axios.post(
        'https://api.paystack.co/transaction/initialize',
        data,
        {
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Paystack initialization error:', error);
      throw error;
    }
  },

  verifyTransaction: async (reference) => {
    try {
      const response = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Paystack verification error:', error);
      throw error;
    }
  },
};

module.exports = paystack;