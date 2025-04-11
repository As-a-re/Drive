import axios from "axios"

const API_URL = "/api"

const api = {
  // Lessons
  getLessons: () => axios.get(`${API_URL}/lessons`),
  getLessonById: (id) => axios.get(`${API_URL}/lessons/${id}`),

  // Enrollments
  getEnrollments: () => axios.get(`${API_URL}/enrollments`),
  getUserEnrollments: (userId) => axios.get(`${API_URL}/users/${userId}/enrollments`),
  createEnrollment: (data) => axios.post(`${API_URL}/enrollments`, data),

  // Payments
  processPayment: (data) => axios.post(`${API_URL}/payments`, data),
  getPayments: () => axios.get(`${API_URL}/payments`),
  verifyPayment: (reference) => axios.get(`${API_URL}/payments/verify/${reference}`),

  // Users
  getUserById: (id) => axios.get(`${API_URL}/users/${id}`),

  // Ghana-specific
  getLocations: () => axios.get(`${API_URL}/locations/ghana`),
  getMobileMoneyProviders: () => axios.get(`${API_URL}/payment-methods/mobile-money`),
}

export default api

