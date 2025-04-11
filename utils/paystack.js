const axios = require("axios")

// This would be your actual Paystack secret key from environment variables
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || "sk_test_yoursecretkey"

const paystack = {
  /**
   * Initialize a transaction with Paystack
   * @param {Object} data - Transaction data
   * @returns {Promise} - Paystack API response
   */
  initializeTransaction: async (data) => {
    try {
      const response = await axios.post("https://api.paystack.co/transaction/initialize", data, {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      })

      return response.data
    } catch (error) {
      console.error("Paystack initialization error:", error.response ? error.response.data : error.message)
      throw error
    }
  },

  /**
   * Verify a transaction with Paystack
   * @param {String} reference - Transaction reference
   * @returns {Promise} - Paystack API response
   */
  verifyTransaction: async (reference) => {
    try {
      const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      })

      return response.data
    } catch (error) {
      console.error("Paystack verification error:", error.response ? error.response.data : error.message)
      throw error
    }
  },

  /**
   * Get list of banks from Paystack
   * @returns {Promise} - Paystack API response
   */
  getBanks: async () => {
    try {
      const response = await axios.get("https://api.paystack.co/bank", {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      })

      return response.data
    } catch (error) {
      console.error("Paystack get banks error:", error.response ? error.response.data : error.message)
      throw error
    }
  },
}

module.exports = paystack

