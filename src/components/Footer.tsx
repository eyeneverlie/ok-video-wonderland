
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, Twitter, Instagram, Youtube, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                VideoWonderland
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Experience the art of storytelling through carefully curated video content that inspires, entertains, and connects.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Twitter className="h-5 w-5" />} href="https://twitter.com" />
              <SocialLink icon={<Instagram className="h-5 w-5" />} href="https://instagram.com" />
              <SocialLink icon={<Youtube className="h-5 w-5" />} href="https://youtube.com" />
              <SocialLink icon={<Github className="h-5 w-5" />} href="https://github.com" />
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-medium text-lg mb-4">Explore</h3>
            <ul className="space-y-3">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/trending" label="Trending" />
              <FooterLink href="/categories" label="Categories" />
              <FooterLink href="/live" label="Live Streams" />
              <FooterLink href="/premium" label="Premium Content" />
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <FooterLink href="/help" label="Help Center" />
              <FooterLink href="/creators" label="Creators" />
              <FooterLink href="/community" label="Community" />
              <FooterLink href="/partners" label="Partners" />
              <FooterLink href="/blog" label="Blog" />
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <FooterLink href="/about" label="About Us" />
              <FooterLink href="/careers" label="Careers" />
              <FooterLink href="/press" label="Press" />
              <FooterLink href="/contact" label="Contact" />
              <FooterLink href="/legal" label="Legal" />
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-medium text-lg mb-2">Stay Connected</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to our newsletter for updates, new features, and exclusive content.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-secondary px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-r-md transition duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© 2024 VideoWonderland. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-foreground transition duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-foreground transition duration-200">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-foreground transition duration-200">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-white transition-colors duration-300"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    {icon}
  </motion.a>
);

const FooterLink = ({ href, label }: { href: string; label: string }) => (
  <li>
    <Link
      to={href}
      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
    >
      {label}
    </Link>
  </li>
);

export default Footer;
