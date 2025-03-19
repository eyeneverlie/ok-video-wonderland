
import axios from 'axios';

interface UploadProgress {
  onProgress: (percentage: number) => void;
}

interface UploadResponse {
  videoId: string;
  url: string;
  success: boolean;
  message?: string;
}

/**
 * Uploads a video file to the server
 * @param videoFile The video file to upload
 * @param thumbnailFile Optional thumbnail file
 * @param metadata Additional metadata for the video
 * @param options Upload options including progress callback
 * @returns Promise that resolves with the upload response
 */
export async function uploadVideo(
  videoFile: File,
  thumbnailFile: File | null,
  metadata: {
    title: string;
    description?: string;
    tags?: string;
  },
  options: UploadProgress
): Promise<UploadResponse> {
  // Create form data to send files and metadata
  const formData = new FormData();
  formData.append('video', videoFile);
  
  if (thumbnailFile) {
    formData.append('thumbnail', thumbnailFile);
  }
  
  // Add metadata
  formData.append('title', metadata.title);
  
  if (metadata.description) {
    formData.append('description', metadata.description);
  }
  
  if (metadata.tags) {
    formData.append('tags', metadata.tags);
  }
  
  try {
    // Replace with your actual VPS API endpoint
    const serverUrl = import.meta.env.VITE_UPLOAD_API_URL || 'https://your-vps-domain.com/api/upload';
    
    const response = await axios.post(serverUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // Add authorization if needed
        // 'Authorization': `Bearer ${token}`,
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          options.onProgress(percentCompleted);
        }
      },
    });
    
    return {
      videoId: response.data.videoId,
      url: response.data.url,
      success: true
    };
  } catch (error) {
    console.error('Upload failed:', error);
    return {
      videoId: '',
      url: '',
      success: false,
      message: error instanceof Error ? error.message : 'Upload failed'
    };
  }
}
