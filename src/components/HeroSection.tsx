import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Uganda business community"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient opacity-80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Discover Local
          <span className="block text-primary-light">Businesses in Uganda</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Find the best clinics, salons, restaurants, auto services, and more in your community.
          Connect with trusted local businesses near you.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
              <Input
                placeholder="What business are you looking for?"
                className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70 h-12"
              />
            </div>
            <Button size="lg" className="bg-primary hover:bg-primary-dark px-8 h-12">
              Search
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-12 max-w-md mx-auto">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">500+</div>
            <div className="text-sm text-white/80">Businesses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">50+</div>
            <div className="text-sm text-white/80">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">1000+</div>
            <div className="text-sm text-white/80">Reviews</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;