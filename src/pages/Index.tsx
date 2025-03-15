
import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedVideos from "@/components/FeaturedVideos";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  // Smooth scroll to top on page load
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <HeroSection />
          <FeaturedVideos />
          
          {/* Additional Promotion Section */}
          <section className="py-20 bg-secondary/50">
            <div className="container">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                  >
                    <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      Premium Experience
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold">
                      Elevate Your Viewing Experience
                    </h2>
                    <p className="text-muted-foreground">
                      Unlock exclusive content, ad-free viewing, and premium features 
                      designed to transform the way you discover and enjoy videos.
                    </p>
                    <div className="pt-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-primary text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Explore Premium
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="order-1 md:order-2"
                >
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur-xl opacity-70" />
                    <img
                      src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
                      alt="Premium Experience"
                      className="rounded-xl shadow-2xl relative z-10 w-full"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
