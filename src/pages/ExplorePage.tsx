
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Filter, Search, ArrowUpDown } from "lucide-react";
import { staggerContainer, fadeUp } from "@/lib/animations";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoCard from "@/components/VideoCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock video data
const ALL_VIDEOS = [
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
  {
    id: "9",
    title: "Aerial Photography: Drone Techniques for Beginners",
    thumbnail: "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    duration: "16:22",
    views: "1.4M",
    author: "Aerial Vision",
    authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    timeAgo: "3 months ago"
  },
  {
    id: "10",
    title: "Sustainable Living in Small Apartments",
    thumbnail: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    duration: "9:16",
    views: "786K",
    author: "EcoLiving",
    authorAvatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    timeAgo: "1 month ago"
  },
  {
    id: "11",
    title: "Future of Remote Work: Technology and Spaces",
    thumbnail: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    duration: "11:47",
    views: "932K",
    author: "Future Work",
    authorAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    timeAgo: "4 weeks ago"
  },
  {
    id: "12",
    title: "Deep Ocean Exploration: The Last Frontier",
    thumbnail: "https://images.unsplash.com/photo-1551244072-5d12893278ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    duration: "24:38",
    views: "3.2M",
    author: "Deep Blue",
    authorAvatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    timeAgo: "7 months ago"
  }
];

const CATEGORIES = [
  "All", "Technology", "Design", "Photography", "Music", 
  "Travel", "Education", "Food", "Gaming", "Science"
];

const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortMethod, setSortMethod] = useState("recent");
  const [durationFilter, setDurationFilter] = useState("all");

  // Filter videos based on search term and category
  const filteredVideos = ALL_VIDEOS.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          video.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || true; // In a real app, videos would have categories
    return matchesSearch && matchesCategory;
  });

  // Sort videos based on selected sort method
  const sortedVideos = [...filteredVideos].sort((a, b) => {
    switch (sortMethod) {
      case "popular":
        return parseInt(b.views.replace(/[^0-9]/g, "")) - parseInt(a.views.replace(/[^0-9]/g, ""));
      case "oldest":
        return -1; // This would use real dates in a production app
      default: // recent
        return 1; // This would use real dates in a production app
    }
  });

  // Filter videos by duration (if applicable)
  const finalVideos = durationFilter === "all" 
    ? sortedVideos 
    : sortedVideos.filter(video => {
        const minutes = parseInt(video.duration.split(":")[0]);
        if (durationFilter === "short") return minutes < 5;
        if (durationFilter === "medium") return minutes >= 5 && minutes < 20;
        if (durationFilter === "long") return minutes >= 20;
        return true;
      });

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-16">
          <div className="container max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold mb-2"
              >
                Explore Videos
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-muted-foreground"
              >
                Discover new content from creators around the world
              </motion.p>
            </div>

            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 space-y-4"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search videos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex gap-2">
                        <Filter className="h-4 w-4" />
                        <span className="hidden sm:inline">Filters</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="p-2">
                        <p className="text-sm font-medium mb-2">Duration</p>
                        <Select
                          value={durationFilter}
                          onValueChange={setDurationFilter}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Durations</SelectItem>
                            <SelectItem value="short">Under 5 minutes</SelectItem>
                            <SelectItem value="medium">5-20 minutes</SelectItem>
                            <SelectItem value="long">Over 20 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex gap-2">
                        <ArrowUpDown className="h-4 w-4" />
                        <span className="hidden sm:inline">Sort</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSortMethod("recent")}>
                        Most Recent
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortMethod("popular")}>
                        Most Popular
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortMethod("oldest")}>
                        Oldest First
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </motion.div>

            {/* Category Tabs */}
            <Tabs defaultValue="All" className="mb-8">
              <TabsList className="mb-6 overflow-x-auto flex w-full justify-start pb-2 no-scrollbar">
                {CATEGORIES.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    onClick={() => setActiveCategory(category)}
                    className="whitespace-nowrap"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={activeCategory} className="mt-0">
                {finalVideos.length > 0 ? (
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    {finalVideos.map((video) => (
                      <motion.div key={video.id} variants={fadeUp}>
                        <Link to={`/video/${video.id}`}>
                          <VideoCard {...video} />
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No videos found matching your criteria</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default ExplorePage;
