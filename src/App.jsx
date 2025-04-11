import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import LessonsPage from "./pages/LessonsPage"
import LessonDetailPage from "./pages/LessonDetailPage"
import AboutPage from "./pages/AboutPage"
import FAQPage from "./pages/FAQPage"
import ContactPage from "./pages/ContactPage"
import BlogPage from "./pages/BlogPage"
import BlogPostPage from "./pages/BlogPostPage"
import DashboardPage from "./pages/DashboardPage"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminStudents from "./pages/admin/AdminStudents"
import AdminPayments from "./pages/admin/AdminPayments"
import AdminLessons from "./pages/admin/AdminLessons"
import AdminEnrollments from "./pages/admin/AdminEnrollments"
import AdminSettings from "./pages/admin/AdminSettings"
import AdminLayout from "./components/admin/AdminLayout"

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="lessons" element={<AdminLessons />} />
          <Route path="enrollments" element={<AdminEnrollments />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route index element={<HomePage />} />
                  <Route path="lessons" element={<LessonsPage />} />
                  <Route path="lessons/:id" element={<LessonDetailPage />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="faq" element={<FAQPage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="blog" element={<BlogPage />} />
                  <Route path="blog/:id" element={<BlogPostPage />} />
                  <Route path="dashboard" element={<DashboardPage />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  )
}

export default App

