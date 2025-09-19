import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  MapPin, 
  Star, 
  Users, 
  Building2, 
  TrendingUp,
  Shield,
  Camera,
  Settings,
  BarChart3,
  MessageSquare,
  UserCheck,
  ArrowRight,
  CheckCircle,
  Heart,
  Share2
} from 'lucide-react'

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23059669" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm">
            🇺🇬 Discover Uganda's Best Businesses
          </Badge>
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
          <Card className="p-2 shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <input
                  type="text"
                  placeholder="What business are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border-0 bg-transparent focus:outline-none focus:ring-0"
                />
              </div>
              <div className="relative flex-1">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <input
                  type="text"
                  placeholder="Location in Uganda"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border-0 bg-transparent focus:outline-none focus:ring-0"
                />
              </div>
              <Button size="lg" className="px-8 py-4 text-lg bg-primary hover:bg-primary/90">
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
          </Card>
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
  )
}

const CategoriesSection = () => {
  const categories = [
    { name: 'Restaurants', icon: '🍽️', count: 120, color: 'bg-red-50 text-red-600' },
    { name: 'Salons & Beauty', icon: '💄', count: 85, color: 'bg-pink-50 text-pink-600' },
    { name: 'Clinics & Health', icon: '🏥', count: 65, color: 'bg-green-50 text-green-600' },
    { name: 'Auto Services', icon: '🚗', count: 45, color: 'bg-blue-50 text-blue-600' },
    { name: 'Shopping', icon: '🛍️', count: 90, color: 'bg-purple-50 text-purple-600' },
    { name: 'Education', icon: '📚', count: 35, color: 'bg-yellow-50 text-yellow-600' },
    { name: 'Entertainment', icon: '🎬', count: 25, color: 'bg-indigo-50 text-indigo-600' },
    { name: 'Services', icon: '🔧', count: 55, color: 'bg-gray-50 text-gray-600' },
  ]

  return (
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
          {categories.map((category, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-md hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${category.color}`}>
                  {category.count} businesses
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const FeaturedBusinesses = () => {
  const businesses = [
    {
      name: "Kampala Bites Restaurant",
      category: "Restaurant",
      rating: 4.9,
      reviews: 156,
      image: "🍽️",
      location: "Kampala Central",
      featured: true
    },
    {
      name: "Style Street Salon",
      category: "Beauty & Salon",
      rating: 4.8,
      reviews: 89,
      image: "💄",
      location: "Nakasero",
      featured: true
    },
    {
      name: "Health First Clinic",
      category: "Medical",
      rating: 4.7,
      reviews: 203,
      image: "🏥",
      location: "Kololo",
      featured: true
    },
    {
      name: "AutoCare Services",
      category: "Auto Repair",
      rating: 4.6,
      reviews: 67,
      image: "🚗",
      location: "Industrial Area",
      featured: true
    }
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Businesses
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the most popular and highly-rated businesses in Uganda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {businesses.map((business, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="text-5xl mb-3">{business.image}</div>
                  <Badge variant="secondary" className="mb-2">Featured</Badge>
                </div>
                
                <h3 className="font-bold text-lg mb-2">{business.name}</h3>
                <p className="text-muted-foreground text-sm mb-3">{business.category}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                    <span className="font-semibold">{business.rating}</span>
                    <span className="text-muted-foreground text-sm ml-1">({business.reviews})</span>
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {business.location}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const AdminAccessSection = () => {
  return (
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
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Business Owner Portal</h3>
              <p className="text-muted-foreground mb-6">
                Manage your business profile, upload photos, respond to reviews, and track your performance.
              </p>
              <div className="space-y-3 mb-6 text-left">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Update business information</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Upload photos & gallery</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Respond to customer reviews</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>View analytics & insights</span>
                </div>
              </div>
              <Button size="lg" className="w-full group-hover:bg-primary/90">
                Business Login
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>

          {/* App Owner Admin */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Platform Admin Portal</h3>
              <p className="text-muted-foreground mb-6">
                Oversee the entire platform, manage businesses, moderate content, and analyze platform performance.
              </p>
              <div className="space-y-3 mb-6 text-left">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Manage all businesses</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Moderate reviews & content</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>User management</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Platform analytics</span>
                </div>
              </div>
              <Button size="lg" variant="outline" className="w-full group-hover:bg-secondary group-hover:text-white">
                Platform Admin
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

const Footer = () => {
  return (
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
              <Button variant="outline" size="sm">Facebook</Button>
              <Button variant="outline" size="sm">Twitter</Button>
              <Button variant="outline" size="sm">Instagram</Button>
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
  )
}

export { HeroSection, CategoriesSection, FeaturedBusinesses, AdminAccessSection, Footer }
