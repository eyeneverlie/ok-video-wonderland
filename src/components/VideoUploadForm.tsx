
import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Upload, X, FileVideo, Image } from "lucide-react";
import { motion } from "framer-motion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Form validation schema
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title cannot exceed 100 characters"),
  description: z.string().max(500, "Description cannot exceed 500 characters").optional(),
  tags: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface VideoUploadFormProps {
  isUploading: boolean;
  setIsUploading: (uploading: boolean) => void;
  onUploadSuccess: (videoId: string) => void;
}

const VideoUploadForm = ({ isUploading, setIsUploading, onUploadSuccess }: VideoUploadFormProps) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: "",
    },
  });

  const handleVideoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Validate video file
    if (!file.type.includes('video/')) {
      setError("Please upload a valid video file (MP4, AVI, MOV)");
      return;
    }
    
    if (file.size > 500 * 1024 * 1024) { // 500MB limit
      setError("Video file is too large. Please upload a file under 500MB.");
      return;
    }
    
    setVideoFile(file);
    setError(null);
    
    // Auto-populate title from filename
    if (!form.getValues("title")) {
      const fileName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
      form.setValue("title", fileName);
    }
  };

  const handleThumbnailSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Validate image file
    if (!file.type.includes('image/')) {
      setError("Please upload a valid image file for the thumbnail");
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError("Thumbnail is too large. Please upload an image under 5MB.");
      return;
    }
    
    setThumbnailFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setThumbnailPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    setError(null);
  };

  const handleRemoveVideo = () => {
    setVideoFile(null);
    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  };

  const handleRemoveThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview(null);
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = "";
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          // Simulate processing time
          setTimeout(() => {
            setIsUploading(false);
            // Generate a random video ID (in a real app, this would come from the server)
            const videoId = `vid-${Math.random().toString(36).substring(2, 12)}`;
            onUploadSuccess(videoId);
          }, 1500);
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };

  const onSubmit = (values: FormValues) => {
    // Validate files exist
    if (!videoFile) {
      setError("Please select a video to upload");
      return;
    }
    
    // Clear any previous errors
    setError(null);
    
    // For demo purposes, we'll just simulate the upload
    // In a real app, you would upload to a server or cloud storage
    simulateUpload();
    
    console.log("Form values:", values);
    console.log("Video file:", videoFile);
    console.log("Thumbnail file:", thumbnailFile);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Video Upload Area */}
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Video</h2>
          
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          )}
          
          {!videoFile ? (
            <div 
              onClick={() => videoInputRef.current?.click()}
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center cursor-pointer hover:bg-accent/50 transition-colors"
            >
              <input
                type="file"
                ref={videoInputRef}
                onChange={handleVideoSelect}
                accept="video/*"
                className="hidden"
              />
              <FileVideo className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Drag and drop or click to upload</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                MP4, AVI, or MOV. Maximum file size 500MB.
              </p>
            </div>
          ) : (
            <div className="border rounded-lg p-4 relative">
              <div className="flex items-center">
                <FileVideo className="h-8 w-8 mr-3 text-primary" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{videoFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleRemoveVideo} 
                  disabled={isUploading}
                  className="ml-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Thumbnail Upload Area */}
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Thumbnail (Optional)</h2>
          
          {!thumbnailPreview ? (
            <div 
              onClick={() => thumbnailInputRef.current?.click()}
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center cursor-pointer hover:bg-accent/50 transition-colors"
            >
              <input
                type="file"
                ref={thumbnailInputRef}
                onChange={handleThumbnailSelect}
                accept="image/*"
                className="hidden"
              />
              <Image className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <h3 className="text-base font-medium mb-1">Upload thumbnail image</h3>
              <p className="text-sm text-muted-foreground">
                JPG, PNG, or GIF. Recommended size 1280×720.
              </p>
            </div>
          ) : (
            <div className="relative rounded-lg overflow-hidden">
              <img 
                src={thumbnailPreview} 
                alt="Thumbnail preview" 
                className="w-full h-auto max-h-60 object-cover rounded-lg"
              />
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleRemoveThumbnail} 
                disabled={isUploading}
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        {/* Form Fields */}
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Details</h2>
          
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter video title" {...field} disabled={isUploading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your video (optional)" 
                    className="min-h-32 resize-none"
                    {...field}
                    disabled={isUploading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Add tags separated by commas (optional)" 
                    {...field}
                    disabled={isUploading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {/* Upload Progress */}
        {isUploading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-2"
          >
            <p className="font-medium text-sm">{uploadProgress < 100 ? "Uploading..." : "Processing..."}</p>
            <Progress value={uploadProgress} className="h-2 w-full" />
            <p className="text-xs text-muted-foreground">
              {uploadProgress < 100 
                ? `${Math.round(uploadProgress)}% complete` 
                : "Your video is being processed. This may take a moment."}
            </p>
          </motion.div>
        )}
        
        {/* Submit Button */}
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isUploading || !videoFile} 
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            {isUploading ? "Uploading..." : "Upload Video"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default VideoUploadForm;
