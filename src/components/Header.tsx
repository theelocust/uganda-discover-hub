import { Search, Menu, User, Building2, Shield, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-background border-b border-border shadow-brand sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold text-secondary">FindMeUG</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8">
            <div className="flex items-center w-full bg-muted rounded-lg border border-border overflow-hidden">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="What are you looking for?"
                  className="pl-10 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <div className="w-px h-6 bg-border"></div>
              <div className="relative flex-1">
                <Input
                  placeholder="Location in Uganda"
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <Button size="sm" className="m-1 bg-primary hover:bg-primary/90">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            {/* Business Owner Login */}
            <Link to="/business-login">
              <Button variant="ghost" size="sm" className="hidden md:flex items-center">
                <Building2 className="h-4 w-4 mr-2" />
                Business Owner
              </Button>
            </Link>
            
            {/* Platform Admin Login */}
            <Link to="/admin-login">
              <Button variant="ghost" size="sm" className="hidden md:flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Platform Admin
              </Button>
            </Link>

            {/* Regular User Account */}
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <User className="h-4 w-4 mr-2" />
              Account
            </Button>
            
            {/* List Business Button */}
            <Button size="sm" className="bg-primary hover:bg-primary-dark">
              List Business
            </Button>
            
            {/* Mobile menu */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden mt-3 space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="What are you looking for?"
              className="pl-10 bg-muted border-border"
            />
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Location in Uganda"
              className="flex-1 bg-muted border-border"
            />
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Mobile Login Options */}
          <div className="flex gap-2 pt-2">
            <Link to="/business-login" className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                <Building2 className="h-4 w-4 mr-2" />
                Business Owner
              </Button>
            </Link>
            <Link to="/admin-login" className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                <Shield className="h-4 w-4 mr-2" />
                Platform Admin
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;