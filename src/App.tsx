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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header />
        
        <Routes>
          {/* Main Home Page */}
          <Route path="/" element={
            <>
              <HeroSection />
              <main className="container mx-auto px-4 py-12">
                <CategoriesGrid />
                <TrendingBusinesses />
                <Analytics />
              </main>
            </>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard is_admin={true} />} />
          <Route path="/admin/businesses" element={<BusinessManagement />} />
          <Route path="/admin/reviews" element={<ReviewsManagement />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
