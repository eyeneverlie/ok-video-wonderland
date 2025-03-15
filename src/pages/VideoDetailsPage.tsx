
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Share2, ThumbsUp, MessageCircle, Bookmark, Flag } from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { staggerContainer, fadeUp } from "@/lib/animations";
import VideoCard from "@/components/VideoCard";

// Mock video data
const VIDEO_DATA = {
  id: "video123",
  title: "Breathtaking Coastal Sunset Time-lapse in 4K HDR",
  description: "Experience the mesmerizing transition from day to night in this ultra high definition time-lapse captured along the Pacific coastline. Watch as the colors of the sky transform while waves crash against the shore in perfect rhythm. Shot with state-of-the-art equipment to capture every detail of nature's daily masterpiece.",
  videoSrc: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // Sample video URL
  poster: "https://images.unsplash.com/photo-1544979347-cea9c5c5e825?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  views: "1.2M",
  likes: "45.3K",
  comments: "2.7K",
  publishedAt: "2023-09-15",
  author: "Nature Visuals",
  authorId: "naturevisuals",
  authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  subscriberCount: "420K",
  tags: ["nature", "timelapse", "sunset", "4K", "coastline"],
  category: "Nature & Travel"
};

// Mock related videos
const RELATED_VIDEOS = [
  {
    id: "rel1",
    title: "Aurora Borealis: Nature's Light Show",
    thumbnail: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80",
    duration: "7:12",
    views: "890K",
    author: "Night Sky Photography",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    timeAgo: "2 weeks ago"
  },
  {
    id: "rel2",
    title: "Underwater Coral Reef Exploration",
    thumbnail: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    duration: "12:45",
    views: "1.5M",
    author: "Ocean Explorers",
    authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    timeAgo: "1 month ago"
  },
  {
    id: "rel3",
    title: "Desert Storm Formation Captured in 8K",
    thumbnail: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    duration: "8:32",
    views: "673K",
    author: "Weather Chasers",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    timeAgo: "3 weeks ago"
  },
  {
    id: "rel4",
    title: "Rainforest Canopy: Life Above the Floor",
    thumbnail: "https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    duration: "15:21",
    views: "2.1M",
    author: "Biodiversity Channel",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    timeAgo: "2 months ago"
  }
];

const VideoDetailsPage = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [video, setVideo] = useState(VIDEO_DATA);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Simulate fetching video data based on ID
  useEffect(() => {
    // In a real app, you would fetch data from an API here
    console.log(`Fetching video with ID: ${videoId}`);
    // This is just a mock - we're using the static VIDEO_DATA
    setVideo(VIDEO_DATA);
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [videoId]);

  // Format the date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-16">
          <div className="container max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content - Video and details */}
              <div className="lg:col-span-2">
                {/* Video Player */}
                <div className="mb-6">
                  <VideoPlayer 
                    videoSrc={video.videoSrc} 
                    poster={video.poster}
                    title={video.title}
                  />
                </div>

                {/* Video title and stats */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-4"
                >
                  <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
                  <div className="flex flex-wrap items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span>{video.views} views</span>
                      <span>{formatDate(video.publishedAt)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setIsLiked(!isLiked)}
                        className={`flex items-center ${isLiked ? 'text-primary' : ''}`}
                      >
                        <ThumbsUp className="mr-1.5 h-4 w-4" />
                        <span>{video.likes}</span>
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="flex items-center">
                        <MessageCircle className="mr-1.5 h-4 w-4" />
                        <span>{video.comments}</span>
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setIsSaved(!isSaved)}
                        className={`flex items-center ${isSaved ? 'text-primary' : ''}`}
                      >
                        <Bookmark className="mr-1.5 h-4 w-4" />
                        <span>Save</span>
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="flex items-center">
                        <Share2 className="mr-1.5 h-4 w-4" />
                        <span>Share</span>
                      </Button>
                    </div>
                  </div>
                </motion.div>

                <Separator className="my-4" />

                {/* Channel info */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex flex-wrap items-center justify-between mb-6"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={video.authorAvatar} alt={video.author} />
                      <AvatarFallback>{video.author.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{video.author}</h3>
                      <p className="text-sm text-muted-foreground">{video.subscriberCount} subscribers</p>
                    </div>
                  </div>
                  
                  <Button 
                    variant={isSubscribed ? "outline" : "default"}
                    className={`mt-2 sm:mt-0 ${isSubscribed ? 'border-primary/50 text-primary' : ''}`}
                    onClick={() => setIsSubscribed(!isSubscribed)}
                  >
                    {isSubscribed ? 'Subscribed' : 'Subscribe'}
                  </Button>
                </motion.div>

                {/* Video description */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="bg-secondary/40 rounded-lg p-4 mb-8"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {video.tags.map(tag => (
                        <Link 
                          key={tag} 
                          to={`/tag/${tag}`}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full hover:bg-primary/20 transition-colors"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                    
                    <p className={`text-sm ${!showFullDescription && 'line-clamp-3'}`}>
                      {video.description}
                    </p>
                    
                    {video.description.length > 200 && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        className="text-xs mt-1"
                      >
                        {showFullDescription ? 'Show less' : 'Show more'}
                      </Button>
                    )}
                  </div>
                </motion.div>

                {/* Comments section placeholder */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="mb-8"
                >
                  <h3 className="text-lg font-medium mb-4">{video.comments} Comments</h3>
                  <div className="p-8 bg-secondary/30 rounded-lg text-center">
                    <p className="text-muted-foreground">Comments are disabled in this demo</p>
                  </div>
                </motion.div>
              </div>

              {/* Sidebar - Related videos */}
              <div>
                <h3 className="text-lg font-medium mb-4">Related Videos</h3>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                  className="space-y-4"
                >
                  {RELATED_VIDEOS.map((relatedVideo) => (
                    <motion.div key={relatedVideo.id} variants={fadeUp}>
                      <Link to={`/video/${relatedVideo.id}`}>
                        <VideoCard {...relatedVideo} />
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default VideoDetailsPage;
