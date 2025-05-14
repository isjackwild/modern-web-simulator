import { useState, useRef } from "react";
import styles from "./RelaunchBrowser.module.scss";

interface RelaunchBrowserProps {
  onRemove: () => void;
}

export const RelaunchBrowser = ({ onRemove }: RelaunchBrowserProps) => {
  const [showModal, setShowModal] = useState(true);
  const [blackScreen, setBlackScreen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleRelaunchNow = () => {
    setShowModal(false);
    // First wait for exit animation
    setTimeout(() => {
      // Then show black screen
      setBlackScreen(true);
      // Wait 3 seconds with black screen
      setTimeout(onRemove, 3000);
    }, 300);
  };

  const handlePostpone = () => {
    setShowModal(false);
    // Wait for exit animation before removing
    setTimeout(onRemove, 300);
    // In a real scenario, this would set a timer to remind in 1 hour
  };

  return (
    <div 
      ref={overlayRef}
      className={`${styles.overlay} ${showModal ? styles.visible : ""} ${blackScreen ? styles.blackout : ""}`}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.icon}>⟳</div>
          <div className={styles.title}>System Update</div>
          <button className={styles.closeButton} onClick={handlePostpone}>×</button>
        </div>
        <div className={styles.content}>
          <p className={styles.message}>
            An important system update has been installed. To complete the installation, your browser needs to be relaunched.
          </p>
          <p className={styles.timeNotice}>Please relaunch within the next 24 hours to apply security fixes.</p>
        </div>
        {!blackScreen && (
          <div className={styles.actions}>
            <button 
              className={styles.postponeButton} 
              onClick={handlePostpone}
            >
              Postpone (1 hour)
            </button>
            <button 
              className={styles.relaunchButton} 
              onClick={handleRelaunchNow}
            >
              Relaunch now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
