import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import AdminDashboard from './components/AdminDashboard'
import BusinessManagement from './components/BusinessManagement'
import ReviewsManagement from './components/ReviewsManagement'
import AdminAnalytics from './components/AdminAnalytics'
import UserManagement from './components/UserManagement'
import BusinessOwnerDashboard from './components/BusinessOwnerDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import AuthPage from './components/Auth/AuthPage'
import { useCategories, useBusinesses, usePlatformStats, useNotifications } from './hooks/useSupabaseData'

// Dynamic Homepage Component with Supabase Integration
const HomePage = () => {
  const { categories, loading: categoriesLoading } = useCategories()
  const { businesses, loading: businessesLoading } = useBusinesses()
  const { stats, loading: statsLoading } = usePlatformStats()
  const { notifications, unreadCount } = useNotifications()

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          
          <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6 border border-white/30">
                🇺🇬 Discover Uganda's Premier Businesses
              </div>
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                Find Your Perfect
                <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">Business Partner</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                From restaurants to salons, clinics to auto services - discover trusted businesses 
                in your community with real reviews and ratings.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-2xl border-0">
                <div className="flex flex-col lg:flex-row gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="What business are you looking for?"
                      className="w-full pl-4 pr-4 py-4 text-lg border-0 bg-transparent focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Location in Uganda"
                      className="w-full pl-4 pr-4 py-4 text-lg border-0 bg-transparent focus:outline-none focus:ring-0"
                    />
                  </div>
                  <button className="px-8 py-4 text-lg bg-primary hover:bg-primary/90 text-white rounded-lg">
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* Dynamic Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                  {statsLoading ? '...' : `${stats.totalBusinesses}+`}
                </div>
                <div className="text-sm text-white/80">Businesses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                  {statsLoading ? '...' : `${stats.totalCategories}+`}
                </div>
                <div className="text-sm text-white/80">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                  {statsLoading ? '...' : `${stats.totalReviews}+`}
                </div>
                <div className="text-sm text-white/80">Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                  {statsLoading ? '...' : `${stats.activeUsers}+`}
                </div>
                <div className="text-sm text-white/80">Active Users</div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Explore Categories
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Find exactly what you're looking for across our diverse business categories
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categoriesLoading ? (
                // Loading skeleton
                Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 text-center shadow-md animate-pulse">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  </div>
                ))
              ) : (
                categories.map((category, index) => (
                  <div key={category.id || index} className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                      {category.count} businesses
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Admin Access Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Business Owners & Admins
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Manage your business or oversee the platform with our powerful admin tools
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Business Owner Admin */}
              <div className="bg-white rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🏢</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Business Owner Portal</h3>
                <p className="text-muted-foreground mb-6">
                  Manage your business profile, upload photos, respond to reviews, and track your performance.
                </p>
                <div className="space-y-3 mb-6 text-left">
                  <div className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Update business information</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Upload photos & gallery</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Respond to customer reviews</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>View analytics & insights</span>
                  </div>
                </div>
                <a href="/business-login" className="inline-block w-full bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg font-medium">
                  Business Login →
                </a>
              </div>

              {/* App Owner Admin - Monetization Style */}
              <div className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 rounded-lg p-8 text-center shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                
                {/* Coming Soon Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                  COMING SOON
                </div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/30">
                    <span className="text-3xl">💰</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Platform Monetization</h3>
                  <p className="text-white/90 mb-6">
                    Advanced analytics, revenue tracking, premium features, and business insights for platform growth.
                  </p>
                  <div className="space-y-3 mb-6 text-left">
                    <div className="flex items-center text-white/90">
                      <span className="text-yellow-300 mr-3">⚡</span>
                      <span>Revenue Analytics</span>
                    </div>
                    <div className="flex items-center text-white/90">
                      <span className="text-yellow-300 mr-3">⚡</span>
                      <span>Premium Subscriptions</span>
                    </div>
                    <div className="flex items-center text-white/90">
                      <span className="text-yellow-300 mr-3">⚡</span>
                      <span>Business Intelligence</span>
                    </div>
                    <div className="flex items-center text-white/90">
                      <span className="text-yellow-300 mr-3">⚡</span>
                      <span>Growth Metrics</span>
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg py-3 px-6 text-white font-medium">
                    🚀 Launching Soon
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-foreground text-background py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">F</span>
                  </div>
                  <span className="text-2xl font-bold">FindMeUG</span>
                </div>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Discover the best local businesses in Uganda. From restaurants to salons, 
                  clinics to auto services - find trusted businesses in your community.
                </p>
                <div className="flex space-x-4">
                  <button className="px-4 py-2 border border-muted-foreground rounded text-sm hover:bg-muted-foreground/10">Facebook</button>
                  <button className="px-4 py-2 border border-muted-foreground rounded text-sm hover:bg-muted-foreground/10">Twitter</button>
                  <button className="px-4 py-2 border border-muted-foreground rounded text-sm hover:bg-muted-foreground/10">Instagram</button>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">How It Works</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">List Your Business</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Report Issue</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-muted-foreground/20 mt-12 pt-8 text-center text-muted-foreground">
              <p>&copy; 2024 FindMeUG. All rights reserved. Made with ❤️ in Uganda.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          {/* Main Home Page */}
          <Route path="/" element={<HomePage />} />
          
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