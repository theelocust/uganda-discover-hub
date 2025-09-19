import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import AdminDashboard from './components/AdminDashboard'
import BusinessManagement from './components/BusinessManagement'
import ReviewsManagement from './components/ReviewsManagement'
import AdminAnalytics from './components/AdminAnalytics'
import UserManagement from './components/UserManagement'
import BusinessOwnerDashboard from './components/BusinessOwnerDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import AuthPage from './components/Auth/AuthPage'

// Simple Homepage Component
const HomePage = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
                🇺🇬 Discover Uganda's Best Businesses
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
                Find Your Perfect
                <span className="block text-primary">Local Business</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                From restaurants to salons, clinics to auto services - discover trusted local businesses 
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

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Businesses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1000+</div>
                <div className="text-sm text-muted-foreground">Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
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
              {[
                { name: 'Restaurants', icon: '🍽️', count: 120 },
                { name: 'Salons & Beauty', icon: '💄', count: 85 },
                { name: 'Clinics & Health', icon: '🏥', count: 65 },
                { name: 'Auto Services', icon: '🚗', count: 45 },
                { name: 'Shopping', icon: '🛍️', count: 90 },
                { name: 'Education', icon: '📚', count: 35 },
                { name: 'Entertainment', icon: '🎬', count: 25 },
                { name: 'Services', icon: '🔧', count: 55 },
              ].map((category, index) => (
                <div key={index} className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                    {category.count} businesses
                  </div>
                </div>
              ))}
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

              {/* App Owner Admin */}
              <div className="bg-white rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Platform Admin Portal</h3>
                <p className="text-muted-foreground mb-6">
                  Oversee the entire platform, manage businesses, moderate content, and analyze platform performance.
                </p>
                <div className="space-y-3 mb-6 text-left">
                  <div className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Manage all businesses</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Moderate reviews & content</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>User management</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span>Platform analytics</span>
                  </div>
                </div>
                <a href="/admin-login" className="inline-block w-full border border-secondary text-secondary hover:bg-secondary hover:text-white py-3 px-6 rounded-lg font-medium">
                  Platform Admin →
                </a>
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