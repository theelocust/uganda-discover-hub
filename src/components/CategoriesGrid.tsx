import { 
  Stethoscope, 
  Scissors, 
  Utensils, 
  Car, 
  ShoppingBag, 
  Home, 
  GraduationCap, 
  Heart,
  Camera,
  Zap,
  Building,
  Sparkles
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  { icon: Stethoscope, name: "Health & Clinics", count: "45+ businesses", color: "text-red-500" },
  { icon: Scissors, name: "Salons & Beauty", count: "38+ businesses", color: "text-pink-500" },
  { icon: Utensils, name: "Restaurants", count: "89+ businesses", color: "text-orange-500" },
  { icon: Car, name: "Auto Services", count: "32+ businesses", color: "text-blue-500" },
  { icon: ShoppingBag, name: "Shopping", count: "67+ businesses", color: "text-green-500" },
  { icon: Home, name: "Home Services", count: "28+ businesses", color: "text-purple-500" },
  { icon: GraduationCap, name: "Education", count: "22+ businesses", color: "text-indigo-500" },
  { icon: Heart, name: "Wellness", count: "19+ businesses", color: "text-rose-500" },
  { icon: Camera, name: "Photography", count: "15+ businesses", color: "text-teal-500" },
  { icon: Zap, name: "Electronics", count: "24+ businesses", color: "text-yellow-500" },
  { icon: Building, name: "Real Estate", count: "18+ businesses", color: "text-gray-500" },
  { icon: Sparkles, name: "Events", count: "16+ businesses", color: "text-fuchsia-500" },
];

const CategoriesGrid = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Explore Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find exactly what you're looking for in our comprehensive business directory
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Card 
              key={category.name} 
              className="card-gradient border-border hover:shadow-brand transition-all duration-300 cursor-pointer group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <category.icon className={`h-12 w-12 mx-auto ${category.color} group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <h3 className="font-semibold text-secondary mb-2">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="text-primary hover:text-primary-dark font-medium">
            View All Categories →
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesGrid;