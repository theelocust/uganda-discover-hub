import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import CategoriesGrid from './components/CategoriesGrid'
import TrendingBusinesses from './components/TrendingBusinesses'
import Analytics from './components/Analytics'
import AdminDashboard from './components/AdminDashboard'
import BusinessManagement from './components/BusinessManagement'
import ReviewsManagement from './components/ReviewsManagement'
import AdminAnalytics from './components/AdminAnalytics'
import UserManagement from './components/UserManagement'
import ProtectedRoute from './components/ProtectedRoute'

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
              <main className="container mx-auto px-4 py-12">
                <CategoriesGrid />
                <TrendingBusinesses />
                <Analytics />
              </main>
            </>
          } />
          
          {/* Protected Admin Routes */}
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
