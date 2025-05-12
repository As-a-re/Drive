import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = {
  // Auth
  login: (data) => axios.post(`${API_URL}/auth/login`, data),
  register: (data) => axios.post(`${API_URL}/auth/register`, data),
  
  // Lessons
  getLessons: () => axios.get(`${API_URL}/lessons`),
  getLessonById: (id) => axios.get(`${API_URL}/lessons/${id}`),
  createLesson: (data) => axios.post(`${API_URL}/lessons`, data),
  updateLesson: (id, data) => axios.put(`${API_URL}/lessons/${id}`, data),
  deleteLesson: (id) => axios.delete(`${API_URL}/lessons/${id}`),

  // Enrollments
  getEnrollments: () => axios.get(`${API_URL}/enrollments`),
  getUserEnrollments: (userId) => axios.get(`${API_URL}/users/${userId}/enrollments`),
  createEnrollment: (data) => axios.post(`${API_URL}/enrollments`, data),
  updateEnrollment: (id, data) => axios.put(`${API_URL}/enrollments/${id}`, data),
  getAvailableTimeSlots: (lessonId, date) => 
    axios.get(`${API_URL}/lessons/${lessonId}/time-slots`, { params: { date }}),

  // Payments
  initializePayment: (data) => axios.post(`${API_URL}/payments/initialize`, data),
  verifyPayment: (reference) => axios.get(`${API_URL}/payments/verify/${reference}`),
  getPayments: () => axios.get(`${API_URL}/payments`),
  getPaymentById: (id) => axios.get(`${API_URL}/payments/${id}`),

  // Users
  getUsers: () => axios.get(`${API_URL}/users`),
  getUserById: (id) => axios.get(`${API_URL}/users/${id}`),
  updateUser: (id, data) => axios.put(`${API_URL}/users/${id}`, data),

  // Stats
  getDashboardStats: () => axios.get(`${API_URL}/stats/dashboard`),
  
  // Testimonials
  getTestimonials: () => axios.get(`${API_URL}/testimonials`),
  
  // Blog
  getBlogPosts: () => axios.get(`${API_URL}/blog`),
  getBlogPostById: (id) => axios.get(`${API_URL}/blog/${id}`),
};

// Add request interceptor for auth
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;