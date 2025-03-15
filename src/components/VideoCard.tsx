
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Clock, Heart } from "lucide-react";

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  author: string;
  authorAvatar: string;
  timeAgo: string;
}

const VideoCard = ({
  id,
  title,
  thumbnail,
  duration,
  views,
  author,
  authorAvatar,
  timeAgo,
}: VideoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="group relative overflow-hidden rounded-xl hover-lift"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div ref={thumbnailRef} className="relative aspect-video overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-black/20 z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
        
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 z-20 bg-black/80 text-white text-xs font-medium px-2 py-1 rounded">
          {duration}
        </div>
        
        {/* Play Button Overlay (shown on hover) */}
        <div className={`absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-primary/90 rounded-full p-3 shadow-lg"
          >
            <Play className="h-8 w-8 text-white" fill="white" />
          </motion.div>
        </div>
      </div>

      {/* Video Info */}
      <div className="mt-3 px-1">
        <div className="flex gap-3">
          {/* Author Avatar */}
          <div className="h-9 w-9 flex-shrink-0">
            <img 
              src={authorAvatar} 
              alt={author}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          
          {/* Title and Meta */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-base leading-tight mb-1 line-clamp-2 text-balance">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">{author}</p>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span>{views} views</span>
              <span className="mx-1">•</span>
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="mt-3 flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200">
            <Clock className="h-4 w-4" />
            <span>Watch Later</span>
          </button>
          <button className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200">
            <Heart className="h-4 w-4" />
            <span>Favorite</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoCard;
