import { useState } from "react";
import styles from "./EmailNotification.module.scss";
import { PhishingEmail } from "../EmailNotification/PhishingEmail";


interface EmailNotificationProps {
  onRemove: () => void;
}

export const EmailNotification = ({ onRemove }: EmailNotificationProps) => {
  const [showNotification, setShowNotification] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  
  const handleNotificationClick = () => {
    setShowNotification(false);
    setShowEmail(true);
  };
  
  const handleCloseEmail = () => {
    setShowEmail(false);
    setTimeout(onRemove, 300);
  };

  if (showEmail) {
    return <PhishingEmail onClose={handleCloseEmail} />;
  }

  return (
    <div className={`${styles.overlay} ${showNotification ? styles.visible : ""}`}>
      <div 
        className={styles.notification}
        onClick={handleNotificationClick}
      >
        <div className={styles.icon}>
          <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="Email icon" />
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <span className={styles.title}>New Email</span>
            <span className={styles.time}>Just now</span>
          </div>
          <div className={styles.sender}>important-security@document-confirm.com</div>
          <div className={styles.subject}>⚠️ Security Alert: Your Account has been Compromised</div>
        </div>
        <div className={styles.closeButton} onClick={(e) => {
          e.stopPropagation();
          setShowNotification(false);
          setTimeout(onRemove, 300);
        }}>
          ✕
        </div>
      </div>
    </div>
  );
};
