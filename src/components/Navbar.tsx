
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Search, Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="/" label="Home" />
          <NavLink href="/explore" label="Explore" />
          <NavLink href="/categories" label="Categories" />
          <NavLink href="/trending" label="Trending" />
          <button className="hover:bg-secondary rounded-full p-2 transition duration-300">
            <Search className="h-5 w-5" />
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 md:hidden"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
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
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-secondary pl-10 pr-4 py-2 rounded-lg text-sm"
              />
            </div>
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
