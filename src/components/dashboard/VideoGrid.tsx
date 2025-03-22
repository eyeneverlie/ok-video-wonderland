
import { useState } from "react";
import { MoreHorizontal, Edit, Trash, Eye, Share2, Link, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface VideoGridProps {
  category?: string;
}

const VideoGrid = ({ category = "all" }: VideoGridProps) => {
  const navigate = useNavigate();
  const [embedUrl, setEmbedUrl] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  
  // Mock video data - in a real app, you would fetch this from an API
  const [videos, setVideos] = useState([
    {
      id: "1",
      title: "Getting Started with React",
      thumbnail: "https://i.ytimg.com/vi/dGcsHMXbSOA/maxresdefault.jpg",
      views: 1204,
      date: "2023-10-15",
      duration: "10:25",
      category: "education",
      embedUrl: "https://www.youtube.com/embed/dGcsHMXbSOA"
    },
    {
      id: "2",
      title: "Advanced CSS Techniques",
      thumbnail: "https://i.ytimg.com/vi/1Rs2ND1ryYc/maxresdefault.jpg",
      views: 843,
      date: "2023-10-10",
      duration: "15:42",
      category: "education",
      embedUrl: "https://www.youtube.com/embed/1Rs2ND1ryYc"
    },
    {
      id: "3",
      title: "Gaming Highlights: Fortnite",
      thumbnail: "https://i.ytimg.com/vi/1tnj3UCkuxU/maxresdefault.jpg",
      views: 5231,
      date: "2023-10-05",
      duration: "8:17",
      category: "gaming",
      embedUrl: "https://www.youtube.com/embed/1tnj3UCkuxU"
    },
    {
      id: "4",
      title: "Music Production Tutorial",
      thumbnail: "https://i.ytimg.com/vi/IJ7-ZjQ0O7Q/maxresdefault.jpg",
      views: 932,
      date: "2023-09-28",
      duration: "22:15",
      category: "music",
      embedUrl: "https://www.youtube.com/embed/IJ7-ZjQ0O7Q"
    },
    {
      id: "5",
      title: "Weekly Vlog: City Tour",
      thumbnail: "https://i.ytimg.com/vi/KJuu1hKo-u8/maxresdefault.jpg",
      views: 2104,
      date: "2023-09-20",
      duration: "18:33",
      category: "vlogs",
      embedUrl: "https://www.youtube.com/embed/KJuu1hKo-u8"
    },
    {
      id: "6",
      title: "Unboxing New Tech Gadgets",
      thumbnail: "https://i.ytimg.com/vi/ujjy6ek2ix4/maxresdefault.jpg",
      views: 1543,
      date: "2023-09-15",
      duration: "12:55",
      category: "vlogs",
      embedUrl: "https://www.youtube.com/embed/ujjy6ek2ix4"
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
  
  const handleEdit = (video: any) => {
    setSelectedVideo(video);
  };
  
  const handleDelete = (id: string) => {
    setVideos(videos.filter(video => video.id !== id));
    toast.success("Video deleted successfully!");
  };
  
  const handleShare = (video: any) => {
    // Create the share URL
    const shareUrl = `${window.location.origin}/video/${video.id}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        toast.success("Share link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy share link");
      });
  };
  
  const handleEmbedUrl = () => {
    if (!embedUrl) {
      toast.error("Please enter a valid URL");
      return;
    }
    
    // Extract video ID from URL (simplified example for YouTube)
    let videoId = "";
    try {
      const url = new URL(embedUrl);
      if (embedUrl.includes("youtube.com") || embedUrl.includes("youtu.be")) {
        if (embedUrl.includes("v=")) {
          videoId = embedUrl.split("v=")[1].split("&")[0];
        } else if (embedUrl.includes("youtu.be/")) {
          videoId = embedUrl.split("youtu.be/")[1];
        }
      }
    } catch (error) {
      toast.error("Invalid URL format");
      return;
    }
    
    if (!videoId && (embedUrl.includes("youtube.com") || embedUrl.includes("youtu.be"))) {
      toast.error("Could not extract video ID from URL");
      return;
    }
    
    // Create a new video object
    const newVideo = {
      id: (videos.length + 1).toString(),
      title: "Embedded Video",
      thumbnail: videoId ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : "https://via.placeholder.com/1280x720?text=External+Video",
      views: 0,
      date: new Date().toISOString().split('T')[0],
      duration: "00:00",
      category: category !== "all" ? category : "other",
      embedUrl: videoId ? `https://www.youtube.com/embed/${videoId}` : embedUrl
    };
    
    // Add to videos array
    setVideos([newVideo, ...videos]);
    setEmbedUrl("");
    toast.success("Video embedded successfully!");
  };
  
  const saveVideoChanges = () => {
    if (!selectedVideo) return;
    
    const updatedVideos = videos.map(video => 
      video.id === selectedVideo.id ? selectedVideo : video
    );
    
    setVideos(updatedVideos);
    setSelectedVideo(null);
    toast.success("Video updated successfully!");
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
    <div>
      <div className="mb-6 p-4 border rounded-lg bg-card">
        <h3 className="font-medium mb-2 flex items-center gap-2">
          <Link className="h-4 w-4" />
          Embed Video from URL
        </h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input 
            placeholder="Paste YouTube or video URL here" 
            value={embedUrl}
            onChange={(e) => setEmbedUrl(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleEmbedUrl}>Embed Video</Button>
        </div>
      </div>
      
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
                    <DropdownMenuItem onClick={() => handleEdit(video)}>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare(video)}>
                      <Share2 className="mr-2 h-4 w-4" />
                      <span>Share</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
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
              
              {video.embedUrl && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3 w-full"
                  onClick={() => window.open(video.embedUrl, '_blank')}
                >
                  <ExternalLink className="h-3 w-3 mr-2" />
                  Open Embedded Video
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Edit Video Dialog */}
      {selectedVideo && (
        <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Video</DialogTitle>
              <DialogDescription>
                Make changes to your video details here.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={selectedVideo.title}
                  onChange={(e) => setSelectedVideo({...selectedVideo, title: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Input
                  id="category"
                  value={selectedVideo.category}
                  onChange={(e) => setSelectedVideo({...selectedVideo, category: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={selectedVideo.description || ""}
                  onChange={(e) => setSelectedVideo({...selectedVideo, description: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="embed" className="text-right">
                  Embed URL
                </Label>
                <Input
                  id="embed"
                  value={selectedVideo.embedUrl || ""}
                  onChange={(e) => setSelectedVideo({...selectedVideo, embedUrl: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedVideo(null)}>
                Cancel
              </Button>
              <Button onClick={saveVideoChanges}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default VideoGrid;
