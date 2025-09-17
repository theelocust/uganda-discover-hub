import { Star, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const trendingBusinesses = [
  {
    id: 1,
    name: "Pearl Health Clinic",
    category: "Health & Clinics",
    rating: 4.8,
    reviews: 127,
    location: "Kampala Central",
    image: "https://images.unsplash.com/photo-1631815589968-fdb09509b044?w=400&h=250&fit=crop",
    isOpen: true,
    trending: true
  },
  {
    id: 2,
    name: "Style Studio Salon",
    category: "Beauty & Salon",
    rating: 4.9,
    reviews: 89,
    location: "Nakasero",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=250&fit=crop",
    isOpen: true,
    trending: true
  },
  {
    id: 3,
    name: "Mama Rita's Kitchen",
    category: "Restaurant",
    rating: 4.7,
    reviews: 156,
    location: "Garden City",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=250&fit=crop",
    isOpen: false,
    trending: true
  },
  {
    id: 4,
    name: "AutoCare Garage",
    category: "Auto Services",
    rating: 4.6,
    reviews: 73,
    location: "Industrial Area",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=250&fit=crop",
    isOpen: true,
    trending: true
  }
];

const TrendingBusinesses = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Trending Businesses
            </h2>
            <p className="text-lg text-muted-foreground">
              Most popular businesses in your community this week
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingBusinesses.map((business, index) => (
            <Link key={business.id} to={`/business/${business.id}`}>
              <Card className="group cursor-pointer hover:shadow-brand transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative">
                  <img
                    src={business.image}
                    alt={business.name}
                    className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  {business.trending && (
                    <Badge className="absolute top-3 left-3 bg-primary hover:bg-primary-dark">
                      🔥 Trending
                    </Badge>
                  )}
                  <div className="absolute top-3 right-3">
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                      business.isOpen 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      <Clock className="h-3 w-3" />
                      <span>{business.isOpen ? 'Open' : 'Closed'}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-secondary mb-2 group-hover:text-primary transition-colors">
                    {business.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{business.category}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{business.rating}</span>
                      <span className="text-sm text-muted-foreground">({business.reviews})</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      {business.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="text-primary hover:text-primary-dark font-medium">
            View All Trending Businesses →
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingBusinesses;