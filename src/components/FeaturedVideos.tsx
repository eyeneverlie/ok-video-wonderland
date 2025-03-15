
import { useState } from "react";
import { motion } from "framer-motion";
import VideoCard from "./VideoCard";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

// Sample video data
const VIDEOS = [
  {
    id: "1",
    title: "Breathtaking Coastal Sunset Time-lapse",
    thumbnail: "https://images.unsplash.com/photo-1544979347-cea9c5c5e825?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    duration: "5:23",
    views: "1.2M",
    author: "Nature Visuals",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    timeAgo: "3 days ago"
  },
  {
    id: "2",
    title: "Urban Architecture Design Principles Explained",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80",
    duration: "18:07",
    views: "843K",
    author: "Modern Design",
    authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    timeAgo: "1 week ago"
  },
  {
    id: "3",
    title: "Minimal Interior Styling for Small Spaces",
    thumbnail: "https://images.unsplash.com/photo-1539617546058-a8f9929d5326?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    duration: "12:49",
    views: "2.7M",
    author: "Interior Philosophy",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    timeAgo: "2 days ago"
  },
  {
    id: "4",
    title: "How to Capture Perfect Product Photography",
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    duration: "7:15",
    views: "543K",
    author: "Creative Lens",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    timeAgo: "5 days ago"
  },
  {
    id: "5",
    title: "Mindful Living: Daily Practices for Balance",
    thumbnail: "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    duration: "15:33",
    views: "1.8M",
    author: "Wellness Journey",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    timeAgo: "1 day ago"
  },
  {
    id: "6",
    title: "Ambient Music Production Techniques",
    thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    duration: "22:17",
    views: "976K",
    author: "Sound Design Lab",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    timeAgo: "3 weeks ago"
  },
  {
    id: "7",
    title: "The Art of Cinematic Color Grading",
    thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    duration: "19:45",
    views: "1.1M",
    author: "Film Academy",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    timeAgo: "6 days ago"
  },
  {
    id: "8",
    title: "Minimalist Design Principles for Digital Products",
    thumbnail: "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    duration: "14:58",
    views: "2.3M",
    author: "UX Principles",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    timeAgo: "2 weeks ago"
  },
];

const CATEGORIES = [
  "All",
  "Technology",
  "Design",
  "Photography",
  "Music",
  "Travel",
  "Lifestyle",
  "Education",
];

const FeaturedVideos = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <section className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-3">
            Featured Content
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Curated Videos For You
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover high-quality content meticulously selected for your interests.
            Explore new ideas and perspectives through our featured collection.
          </p>
        </motion.div>

        {/* Category Pills */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-4 no-scrollbar">
          <div className="flex space-x-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-primary text-white shadow-md"
                    : "bg-secondary text-foreground hover:bg-primary/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
        >
          {VIDEOS.map((video) => (
            <motion.div key={video.id} variants={fadeUp}>
              <VideoCard {...video} />
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            size="lg" 
            className="group"
          >
            <span>Load More</span>
            <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideos;
