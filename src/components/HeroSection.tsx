
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, TrendingUp, Clock, Search } from "lucide-react";

// Featured video data for hero section
const FEATURED_VIDEOS = [
  {
    id: "feat1",
    title: "Immersive Architectural Journey Through Modern Spaces",
    description: "Explore the harmony of function and form in this curated showcase of contemporary architectural masterpieces.",
    coverImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2090&q=80",
  },
  {
    id: "feat2",
    title: "Nature's Rhythm: A Cinematic Experience of the Wild",
    description: "Witness the breathtaking beauty of untouched landscapes and wildlife in this visually stunning documentary.",
    coverImage: "https://images.unsplash.com/photo-1682685797741-f0213d24418c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: "feat3",
    title: "Digital Artistry: The Evolution of Creative Technology",
    description: "A deep dive into how digital tools are transforming artistic expression and creative possibilities.",
    coverImage: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2087&q=80",
  },
];

const HeroSection = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const currentVideo = FEATURED_VIDEOS[currentVideoIndex];

  // Auto rotate featured videos
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentVideoIndex((prev) => (prev + 1) % FEATURED_VIDEOS.length);
        setIsTransitioning(false);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Video/Image with overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div
          key={currentVideo.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: isTransitioning ? 0 : 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background z-10" />
          <img
            src={currentVideo.coverImage}
            alt={currentVideo.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-20 pb-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-primary/90 text-white px-4 py-1 rounded-full text-sm font-medium inline-flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                Featured
              </div>
              <div className="bg-black/30 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm inline-flex items-center">
                Premium Content
              </div>
            </div>
          </motion.div>

          <motion.h1
            key={currentVideo.id + "-title"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-shadow mb-6"
          >
            {currentVideo.title}
          </motion.h1>

          <motion.p
            key={currentVideo.id + "-desc"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl"
          >
            {currentVideo.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link to={`/video/${currentVideo.id}`}>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white group"
              >
                <Play className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                Watch Now
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            >
              <Clock className="mr-2 h-5 w-5" />
              Add to Watchlist
            </Button>
          </motion.div>
        </div>

        {/* Video Position Indicators */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {FEATURED_VIDEOS.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentVideoIndex(index);
                  setIsTransitioning(false);
                }, 500);
              }}
              className={`w-12 h-1.5 rounded-full transition-all duration-300 ${
                currentVideoIndex === index
                  ? "bg-white"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Show featured video ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Search Bar Floating Component - Only on larger screens */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20 hidden md:block w-full max-w-2xl"
      >
        <div className="glass-effect mx-6 rounded-xl overflow-hidden shadow-2xl">
          <div className="flex items-center p-4">
            <Search className="h-5 w-5 text-white/70 mr-3" />
            <input
              type="text"
              placeholder="Search for videos, channels, or categories..."
              className="flex-1 bg-transparent text-white border-none outline-none placeholder:text-white/50"
            />
            <Link to="/explore">
              <Button className="bg-white text-primary hover:bg-white/90 ml-3">
                Search
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
