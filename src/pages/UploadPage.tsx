
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import VideoUploadForm from "@/components/VideoUploadForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const UploadPage = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadSuccess = (videoId: string) => {
    toast.success("Video uploaded successfully!");
    // Redirect to the video details page after successful upload
    navigate(`/video/${videoId}`);
  };
  
  return (
    <PageTransition>
      <div className="container max-w-4xl py-8 px-4 md:px-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)} 
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-6">Upload Video</h1>
          <p className="text-muted-foreground mb-8">
            Share your content with the world. Upload your video in MP4, AVI, or MOV format.
          </p>
          
          <VideoUploadForm 
            isUploading={isUploading} 
            setIsUploading={setIsUploading} 
            onUploadSuccess={handleUploadSuccess} 
          />
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default UploadPage;
