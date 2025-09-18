import { Star, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { useState } from "react";

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
  const [activeTab, setActiveTab] = useState("all");

  const categories = [
    { id: "all", label: "All", count: trendingBusinesses.length },
    { id: "restaurant", label: "Food", count: trendingBusinesses.filter(b => b.category.includes("Restaurant")).length },
    { id: "health", label: "Health", count: trendingBusinesses.filter(b => b.category.includes("Health")).length },
    { id: "beauty", label: "Beauty", count: trendingBusinesses.filter(b => b.category.includes("Beauty")).length },
    { id: "auto", label: "Auto", count: trendingBusinesses.filter(b => b.category.includes("Auto")).length }
  ];

  const getFilteredBusinesses = (category: string) => {
    if (category === "all") return trendingBusinesses;
    return trendingBusinesses.filter(business => 
      business.category.toLowerCase().includes(category.toLowerCase())
    );
  };

  const BusinessCard = ({ business, index }: { business: typeof trendingBusinesses[0], index: number }) => (
    <Link key={business.id} to={`/business/${business.id}`}>
      <Card className="group cursor-pointer hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 animate-fade-in hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20"
            style={{ animationDelay: `${index * 0.1}s` }}>
        <div className="relative overflow-hidden">
          <img
            src={business.image}
            alt={business.name}
            className="w-full h-36 sm:h-40 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {business.trending && (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-primary to-primary-light text-primary-foreground shadow-sm animate-pulse hover:animate-none">
              🔥 Trending
            </Badge>
          )}
          
          <div className="absolute top-3 right-3">
            <div className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm transition-all duration-300 ${
              business.isOpen 
                ? 'bg-green-500/20 text-green-700 border border-green-500/30' 
                : 'bg-red-500/20 text-red-700 border border-red-500/30'
            }`}>
              <Clock className="h-3 w-3" />
              <span>{business.isOpen ? 'Open' : 'Closed'}</span>
            </div>
          </div>
        </div>
        
        <CardContent className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
              {business.name}
            </h3>
            <p className="text-sm text-muted-foreground">{business.category}</p>
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-foreground">{business.rating}</span>
              <span className="text-xs text-muted-foreground">({business.reviews})</span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 mr-1 text-secondary" />
              <span className="truncate max-w-20">{business.location}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16 animate-fade-in">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-secondary via-primary to-secondary-light bg-clip-text text-transparent mb-4">
            Trending Businesses
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the most popular and highly-rated businesses in your community
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8 md:mb-12">
            <TabsList className="grid grid-cols-3 md:grid-cols-5 gap-1 h-auto p-1 bg-muted/50 backdrop-blur-sm rounded-xl shadow-sm">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="relative px-3 py-2 md:px-6 md:py-3 text-xs md:text-sm font-medium rounded-lg transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md hover:bg-primary/10 flex flex-col md:flex-row items-center gap-1 min-w-0"
                >
                  <span className="truncate">{category.label}</span>
                  <span className="inline-flex items-center justify-center w-4 h-4 md:w-5 md:h-5 text-[10px] md:text-xs bg-primary/20 text-primary rounded-full data-[state=active]:bg-primary-foreground/20 data-[state=active]:text-primary-foreground">
                    {category.count}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {getFilteredBusinesses(category.id).map((business, index) => (
                  <BusinessCard key={business.id} business={business} index={index} />
                ))}
              </div>
              
              {getFilteredBusinesses(category.id).length === 0 && (
                <div className="text-center py-12 animate-fade-in">
                  <p className="text-muted-foreground text-lg">No businesses found in this category</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center mt-12 md:mt-16 animate-fade-in">
          <Link to="/businesses" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-primary-foreground font-medium rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5">
            View All Businesses
            <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingBusinesses;