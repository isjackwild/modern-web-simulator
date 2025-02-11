import { useEffect, useState } from "react";
import styles from "./IncomingVideoCall.module.scss";
import { VideoCallScreen } from "./VideoCallScreen";

interface IncomingVideoCallProps {
  onRemove: () => void;
}

export const IncomingVideoCall = ({ onRemove }: IncomingVideoCallProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [isCallAccepted, setIsCallAccepted] = useState(false);

  useEffect(() => {
    // Start ringing animation
    setIsAnimating(true);

    // Auto-dismiss after 30 seconds if not answered
    const timer = setTimeout(() => {
      if (!isCallAccepted) {
        handleDecline();
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [isCallAccepted]);

  const handleDecline = () => {
    setShowNotification(false);
    // Wait for exit animation
    setTimeout(onRemove, 300);
  };

  const handleAccept = () => {
    setIsCallAccepted(true);
    setShowNotification(false);
  };

  if (isCallAccepted) {
    return <VideoCallScreen onEnd={onRemove} />;
  }

  if (!showNotification) return null;

  return (
    <div className={`${styles.container} ${isAnimating ? styles.animate : ""}`}>
      <div className={styles.notificationContent}>
        <div className={styles.callInfo}>
          <div className={styles.avatar}>
            <span>👩</span>
          </div>
          <div className={styles.callerInfo}>
            <div className={styles.callerName}>Mum Mobile</div>
            <div className={styles.callType}>FaceTime Video</div>
          </div>
        </div>

        <div className={styles.actions}>
          <button 
            className={`${styles.actionButton} ${styles.declineButton}`}
            onClick={handleDecline}
          >
            <span className={styles.buttonIcon}>✕</span>
            <span className={styles.buttonText}>Decline</span>
          </button>
          <button 
            className={`${styles.actionButton} ${styles.acceptButton}`}
            onClick={handleAccept}
          >
            <span className={styles.buttonIcon}>✓</span>
            <span className={styles.buttonText}>Accept</span>
          </button>
        </div>
      </div>
    </div>
  );
};
