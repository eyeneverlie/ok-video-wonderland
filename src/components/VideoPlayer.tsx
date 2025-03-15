
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize,
  SkipBack,
  SkipForward,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface VideoPlayerProps {
  videoSrc: string;
  poster?: string;
  title?: string;
  onEnded?: () => void;
  autoplay?: boolean;
}

const VideoPlayer = ({ 
  videoSrc, 
  poster, 
  title, 
  onEnded, 
  autoplay = false 
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<number | null>(null);

  // Load metadata when video is ready
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  // Update progress bar during playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (onEnded) onEnded();
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [onEnded]);

  // Auto-hide controls after inactivity
  useEffect(() => {
    const hideControls = () => {
      if (isPlaying) {
        setShowControls(false);
      }
    };

    if (controlsTimeoutRef.current) {
      window.clearTimeout(controlsTimeoutRef.current);
    }

    controlsTimeoutRef.current = window.setTimeout(hideControls, 3000);

    return () => {
      if (controlsTimeoutRef.current) {
        window.clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, showControls]);

  // Handle play/pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  // Handle mute toggle
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume;
      video.muted = false;
    } else {
      video.muted = true;
    }
    setIsMuted(!isMuted);
  };

  // Handle seeking
  const handleSeek = (value: number[]) => {
    const newTime = (value[0] / 100) * duration;
    setProgress(value[0]);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  // Toggle fullscreen
  const toggleFullScreen = () => {
    const videoContainer = document.querySelector(".video-player-container");
    if (!videoContainer) return;

    if (!isFullScreen) {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };

  // Format time (converts seconds to MM:SS format)
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Skip forward/backward
  const skip = (amount: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = Math.min(Math.max(video.currentTime + amount, 0), video.duration);
  };

  return (
    <div 
      className="video-player-container relative aspect-video bg-black rounded-lg overflow-hidden shadow-xl"
      onMouseMove={() => setShowControls(true)}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        src={videoSrc}
        poster={poster}
        onClick={togglePlay}
        autoPlay={autoplay}
      />

      {/* Video overlay for play/pause on click */}
      <div 
        className="absolute inset-0 cursor-pointer z-10"
        onClick={togglePlay}
      />

      {/* Play/Pause big button in the center (visible when paused) */}
      {!isPlaying && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
        >
          <div className="bg-black/40 rounded-full p-6">
            <Play fill="white" className="h-12 w-12 text-white" />
          </div>
        </motion.div>
      )}

      {/* Video controls */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 z-30"
      >
        {title && (
          <div className="text-white font-medium mb-2 text-sm">{title}</div>
        )}

        {/* Progress bar */}
        <div className="mb-3">
          <Slider
            value={[progress]}
            min={0}
            max={100}
            step={0.1}
            onValueChange={handleSeek}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-xs text-white/80 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={togglePlay}
              className="text-white hover:bg-white/10 rounded-full"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>

            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => skip(-10)}
              className="text-white hover:bg-white/10 rounded-full"
            >
              <SkipBack className="h-5 w-5" />
            </Button>

            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => skip(10)}
              className="text-white hover:bg-white/10 rounded-full"
            >
              <SkipForward className="h-5 w-5" />
            </Button>

            <div className="flex items-center space-x-2 group relative">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleMute}
                className="text-white hover:bg-white/10 rounded-full"
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
              
              <div className="w-20 hidden group-hover:block">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-white/10 rounded-full"
            >
              <Settings className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleFullScreen}
              className="text-white hover:bg-white/10 rounded-full"
            >
              {isFullScreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VideoPlayer;
