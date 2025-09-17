import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, MapPin, Phone, Clock, Globe, Heart, Share2, ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BusinessDetail = () => {
  const { id } = useParams();
  const [isFavorited, setIsFavorited] = useState(false);

  // Mock business data - in real app, this would come from API
  const business = {
    id: 1,
    name: "Pearl Health Clinic",
    category: "Health & Clinics",
    rating: 4.8,
    reviews: 127,
    location: "Kampala Central, Uganda",
    phone: "+256 123 456 789",
    website: "www.pearlhealth.ug",
    hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM",
    image: "https://images.unsplash.com/photo-1631815589968-fdb09509b044?w=800&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1631815589968-fdb09509b044?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=300&fit=crop"
    ],
    description: "Pearl Health Clinic is a modern healthcare facility providing comprehensive medical services to the Kampala community. Our experienced team of doctors and nurses are committed to delivering quality healthcare in a comfortable environment.",
    services: ["General Consultation", "Laboratory Tests", "Dental Care", "Pediatrics", "Vaccinations"],
    isOpen: true
  };

  const reviews = [
    {
      id: 1,
      author: "Sarah M.",
      rating: 5,
      date: "2 days ago",
      comment: "Excellent service! The staff was very professional and the facilities are clean and modern."
    },
    {
      id: 2,
      author: "John K.",
      rating: 4,
      date: "1 week ago",
      comment: "Good experience overall. The wait time was reasonable and the doctor was thorough."
    },
    {
      id: 3,
      author: "Mary A.",
      rating: 5,
      date: "2 weeks ago",
      comment: "Highly recommend! They have excellent customer service and very knowledgeable doctors."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Back Navigation */}
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary-dark mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to search
        </Link>

        {/* Business Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <img
              src={business.image}
              alt={business.name}
              className="w-full h-64 md:h-80 object-cover rounded-lg shadow-brand"
            />
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-primary hover:bg-primary-dark">{business.category}</Badge>
                <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
                  business.isOpen 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  <Clock className="h-4 w-4" />
                  <span>{business.isOpen ? 'Open Now' : 'Closed'}</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-secondary mb-4">{business.name}</h1>
              
              <div className="flex items-center space-x-1 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(business.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="font-medium">{business.rating}</span>
                <span className="text-muted-foreground">({business.reviews} reviews)</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">{business.location}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">{business.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">{business.website}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">{business.hours}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button className="flex-1 bg-primary hover:bg-primary-dark">
                Call Now
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setIsFavorited(!isFavorited)}
              >
                <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current text-red-500' : ''}`} />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-secondary mb-4">About</h3>
                <p className="text-muted-foreground leading-relaxed">{business.description}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="grid gap-6">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="font-medium text-primary">{review.author[0]}</span>
                        </div>
                        <div>
                          <p className="font-medium text-secondary">{review.author}</p>
                          <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="photos" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {business.gallery.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`${business.name} photo ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-secondary mb-4">Services Offered</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {business.services.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-secondary">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default BusinessDetail;