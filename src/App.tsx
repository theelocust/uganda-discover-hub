import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import { HeroSection, CategoriesSection, FeaturedBusinesses, AdminAccessSection, Footer } from './components/HomeSections'
import AdminDashboard from './components/AdminDashboard'
import BusinessManagement from './components/BusinessManagement'
import ReviewsManagement from './components/ReviewsManagement'
import AdminAnalytics from './components/AdminAnalytics'
import UserManagement from './components/UserManagement'
import BusinessOwnerDashboard from './components/BusinessOwnerDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import AuthPage from './components/Auth/AuthPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          {/* Main Home Page */}
          <Route path="/" element={
            <>
              <Header />
              <HeroSection />
              <CategoriesSection />
              <FeaturedBusinesses />
              <AdminAccessSection />
              <Footer />
            </>
          } />
          
          {/* Business Owner Login */}
          <Route path="/business-login" element={
            <AuthPage onAuthSuccess={() => window.location.href = '/business-dashboard'} />
          } />
          
          {/* Platform Admin Login */}
          <Route path="/admin-login" element={
            <AuthPage onAuthSuccess={() => window.location.href = '/admin'} />
          } />
          
          {/* Business Owner Dashboard */}
          <Route path="/business-dashboard" element={
            <ProtectedRoute>
              <BusinessOwnerDashboard />
            </ProtectedRoute>
          } />
          
          {/* Protected Platform Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard is_admin={true} />
            </ProtectedRoute>
          } />
          <Route path="/admin/businesses" element={
            <ProtectedRoute>
              <BusinessManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/reviews" element={
            <ProtectedRoute>
              <ReviewsManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute>
              <UserManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/analytics" element={
            <ProtectedRoute>
              <AdminAnalytics />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
