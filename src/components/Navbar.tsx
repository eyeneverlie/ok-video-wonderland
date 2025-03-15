
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Search, Menu, X, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Mock authentication state for demo
// This would be replaced with a real auth system
const mockAuthState = {
  isAuthenticated: false,
  user: {
    name: "John Doe",
    initials: "JD",
  }
};

export const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(mockAuthState.isAuthenticated);

  // Toggle auth for demo purposes
  const toggleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full py-4 transition-all duration-300",
        isScrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="font-bold text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
          >
            VideoWonderland
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink href="/" label="Home" />
          <NavLink href="/explore" label="Explore" />
          <NavLink href="/categories" label="Categories" />
          <NavLink href="/trending" label="Trending" />
          <button className="hover:bg-secondary rounded-full p-2 transition duration-300">
            <Search className="h-5 w-5" />
          </button>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {mockAuthState.user.initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/upload")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                    <path d="M12 12v9" />
                    <path d="m16 16-4-4-4 4" />
                  </svg>
                  Upload Video
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={toggleAuth}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/sign-in")}
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate("/sign-up")}
              >
                Sign Up
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-3 md:hidden">
          <button className="hover:bg-secondary rounded-full p-2 transition duration-300">
            <Search className="h-5 w-5" />
          </button>
          
          {isAuthenticated ? (
            <Button
              variant="ghost"
              className="relative h-9 w-9 rounded-full p-0"
              onClick={() => navigate("/profile")}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                  {mockAuthState.user.initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          ) : (
            <Button 
              size="sm"
              onClick={() => navigate("/sign-in")}
            >
              Sign In
            </Button>
          )}
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-background border-t border-border"
        >
          <div className="container mx-auto py-4 px-4 flex flex-col space-y-4">
            <MobileNavLink href="/" label="Home" onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavLink href="/explore" label="Explore" onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavLink href="/categories" label="Categories" onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavLink href="/trending" label="Trending" onClick={() => setIsMobileMenuOpen(false)} />
            
            {isAuthenticated ? (
              <>
                <MobileNavLink 
                  href="/profile" 
                  label="My Profile" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                />
                <MobileNavLink 
                  href="/upload" 
                  label="Upload Video" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                />
                <div className="pt-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => {
                      toggleAuth();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </>
            ) : (
              <div className="pt-2 flex flex-col space-y-2">
                <Button 
                  onClick={() => {
                    navigate("/sign-in");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Sign In
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    navigate("/sign-up");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Create Account
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

interface NavLinkProps {
  href: string;
  label: string;
}

const NavLink = ({ href, label }: NavLinkProps) => (
  <Link
    to={href}
    className="relative font-medium text-foreground/80 hover:text-foreground transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
  >
    {label}
  </Link>
);

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink = ({ href, label, onClick }: MobileNavLinkProps) => (
  <Link
    to={href}
    onClick={onClick}
    className="py-2 px-3 text-lg hover:bg-secondary rounded-md transition-colors duration-200"
  >
    {label}
  </Link>
);

export default Navbar;
