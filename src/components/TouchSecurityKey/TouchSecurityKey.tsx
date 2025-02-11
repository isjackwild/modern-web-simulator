import { useEffect, useState } from "react";
import styles from "./TouchSecurityKey.module.scss";

interface TouchSecurityKeyProps {
  onRemove: () => void;
}

export const TouchSecurityKey = ({ onRemove }: TouchSecurityKeyProps) => {
  const [showBrowserPopup, setShowBrowserPopup] = useState(false);
  const [registrationState, setRegistrationState] = useState<
    "waiting" | "registered" | "processing"
  >("waiting");

  useEffect(() => {
    // Show browser popup after a small delay to simulate real behavior
    const timer = setTimeout(() => {
      setShowBrowserPopup(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCancel = () => {
    setRegistrationState("registered");
    setTimeout(() => {
      setRegistrationState("processing");
      setTimeout(onRemove, 1500);
    }, 500);
  };

  return (
    <>
      {showBrowserPopup && (
        <div className={styles.browserPopup}>
          <div className={styles.browserPopupContent}>
            <div className={styles.popupHeader}>
              <div className={styles.securityKeyIcon} />
              <span>
                {registrationState === "waiting" &&
                  "Use your security key with megacorp.com"}
                {registrationState === "registered" && "Touch registered"}
                {registrationState === "processing" && (
                  <>
                    Processing
                    <div className={styles.spinner} />
                  </>
                )}
              </span>
            </div>
            {registrationState === "waiting" && (
              <>
                <p>Insert your security key and touch it</p>
                <div className={styles.popupActions}>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className={styles.fullscreenMessage}>
        <div className={styles.content}>
          <h1>Megacorp SSO</h1>
          <p>Welcome back!</p>
          <p>Insert and touch your Security Key</p>
          <div className={styles.securityKeyGraphic}>
            <div className={styles.keyIcon} />
            <div className={styles.loadingDot} />
          </div>
          <button className={styles.helpButton} onClick={handleCancel}>
            Use Security Tools instead
          </button>
        </div>
      </div>
    </>
  );
};
