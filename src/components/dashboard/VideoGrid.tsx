
import { useState } from "react";
import { MoreHorizontal, Edit, Trash, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface VideoGridProps {
  category?: string;
}

const VideoGrid = ({ category = "all" }: VideoGridProps) => {
  const navigate = useNavigate();
  
  // Mock video data - in a real app, you would fetch this from an API
  const [videos] = useState([
    {
      id: "1",
      title: "Getting Started with React",
      thumbnail: "https://i.ytimg.com/vi/dGcsHMXbSOA/maxresdefault.jpg",
      views: 1204,
      date: "2023-10-15",
      duration: "10:25",
      category: "education"
    },
    {
      id: "2",
      title: "Advanced CSS Techniques",
      thumbnail: "https://i.ytimg.com/vi/1Rs2ND1ryYc/maxresdefault.jpg",
      views: 843,
      date: "2023-10-10",
      duration: "15:42",
      category: "education"
    },
    {
      id: "3",
      title: "Gaming Highlights: Fortnite",
      thumbnail: "https://i.ytimg.com/vi/1tnj3UCkuxU/maxresdefault.jpg",
      views: 5231,
      date: "2023-10-05",
      duration: "8:17",
      category: "gaming"
    },
    {
      id: "4",
      title: "Music Production Tutorial",
      thumbnail: "https://i.ytimg.com/vi/IJ7-ZjQ0O7Q/maxresdefault.jpg",
      views: 932,
      date: "2023-09-28",
      duration: "22:15",
      category: "music"
    },
    {
      id: "5",
      title: "Weekly Vlog: City Tour",
      thumbnail: "https://i.ytimg.com/vi/KJuu1hKo-u8/maxresdefault.jpg",
      views: 2104,
      date: "2023-09-20",
      duration: "18:33",
      category: "vlogs"
    },
    {
      id: "6",
      title: "Unboxing New Tech Gadgets",
      thumbnail: "https://i.ytimg.com/vi/ujjy6ek2ix4/maxresdefault.jpg",
      views: 1543,
      date: "2023-09-15",
      duration: "12:55",
      category: "vlogs"
    }
  ]);
  
  // Filter videos by category if needed
  const filteredVideos = category === "all" 
    ? videos 
    : videos.filter(video => video.category === category);
    
  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + 'M';
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'K';
    }
    return views.toString();
  };
  
  const handleView = (id: string) => {
    navigate(`/video/${id}`);
  };
  
  const handleEdit = (id: string) => {
    // In a real app, navigate to edit page or open edit modal
    console.log("Edit video", id);
  };
  
  const handleDelete = (id: string) => {
    // In a real app, show confirmation dialog and delete
    console.log("Delete video", id);
  };

  if (filteredVideos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No videos found in this category.</p>
        <Button onClick={() => navigate('/upload')} className="flex items-center gap-2">
          Upload a new video
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredVideos.map((video) => (
        <div key={video.id} className="group bg-card rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
          <div className="relative aspect-video bg-muted overflow-hidden">
            <img 
              src={video.thumbnail} 
              alt={video.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
              {video.duration}
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium line-clamp-2">{video.title}</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleView(video.id)}>
                    <Eye className="mr-2 h-4 w-4" />
                    <span>View</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleEdit(video.id)}>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleDelete(video.id)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>{formatViews(video.views)} views</span>
              <span>{new Date(video.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;
