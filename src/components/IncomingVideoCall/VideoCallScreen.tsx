import { useEffect, useState, useRef } from "react";
import styles from "./VideoCallScreen.module.scss";

interface VideoCallScreenProps {
  onEnd: () => void;
}

const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const VideoCallScreen = ({ onEnd }: VideoCallScreenProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Start expansion animation after mount
    requestAnimationFrame(() => setIsExpanded(true));
    // Show controls after expansion
    setTimeout(() => setShowControls(true), 500);

    // Start webcam
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true,
          audio: false // We'll add audio later if needed
        });
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing webcam:', err);
        setIsVideoEnabled(false);
      }
    };

    startWebcam();

    // Start call timer
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      // Clean up webcam stream
      if (localVideoRef.current?.srcObject) {
        const stream = localVideoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleEndCall = () => {
    setShowControls(false);
    setIsExpanded(false);
    // Wait for exit animation
    setTimeout(onEnd, 300);
  };

  const toggleVideo = async () => {
    if (!localVideoRef.current?.srcObject) return;
    
    const stream = localVideoRef.current.srcObject as MediaStream;
    const videoTrack = stream.getVideoTracks()[0];
    
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoEnabled(videoTrack.enabled);
    }
  };

  return (
    <div className={`${styles.container} ${isExpanded ? styles.expanded : ""}`}>
      <div className={styles.videoContainer}>
        {/* Remote video (placeholder) */}
        <video autoPlay muted loop className={styles.remoteVideo}>
          <source src="/path/to/your/video.mp4" type="video/mp4" />
        </video>

        {/* Local video preview */}
        <div className={`${styles.localVideoContainer} ${!isVideoEnabled ? styles.disabled : ''}`}>
          <video 
            ref={localVideoRef}
            autoPlay 
            playsInline
            muted 
            className={styles.localVideo}
          />
          {!isVideoEnabled && (
            <div className={styles.videoDisabled}>
              <span className={styles.videoDisabledIcon}>🎥</span>
            </div>
          )}
        </div>

        {/* Call info */}
        <div className={styles.callInfo}>
          <div className={styles.callerName}>Mum Mobile</div>
          <div className={styles.callDuration}>{formatTime(callDuration)}</div>
        </div>

        {/* Call controls */}
        {showControls && (
          <div className={styles.controls}>
            <button className={`${styles.controlButton} ${styles.muteButton}`}>
              <span className={styles.buttonIcon}>🎤</span>
              <span className={styles.buttonText}>Mute</span>
            </button>
            <button 
              className={`${styles.controlButton} ${styles.videoButton} ${!isVideoEnabled ? styles.disabled : ''}`}
              onClick={toggleVideo}
            >
              <span className={styles.buttonIcon}>{isVideoEnabled ? '📹' : '🚫'}</span>
              <span className={styles.buttonText}>Video</span>
            </button>
            <button 
              className={`${styles.controlButton} ${styles.endButton}`}
              onClick={handleEndCall}
            >
              <span className={styles.buttonIcon}>✕</span>
              <span className={styles.buttonText}>End</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
