import { useState } from "react";
import styles from "./CookieChoices.module.scss";

interface CookieChoicesProps {
  onRemove: () => void;
}

export const CookieChoices = ({ onRemove }: CookieChoicesProps) => {
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  const handleToggle = (key: keyof typeof preferences) => {
    if (key === "necessary") return; // Necessary cookies can't be disabled
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleAcceptAll = () => {
    setPreferences({
      necessary: true,
      analytics: true,
      marketing: true,
    });
    setTimeout(onRemove, 300);
  };

  const handleSave = () => {
    setTimeout(onRemove, 300);
  };

  return (
    <div className={styles.container}>
      <div className={styles.cookieCard}>
        <div className={styles.header}>
          <div className={styles.emoji}>🍪</div>
          <h2>Cookie Preferences</h2>
          <p>Help us create a more personalized experience</p>
        </div>

        <div className={styles.options}>
          <div className={styles.option}>
            <div className={styles.optionInfo}>
              <div className={styles.optionHeader}>
                <h3>Essential Cookies</h3>
                <div className={styles.badge}>Required</div>
              </div>
              <p>These cookies are necessary for the website to function properly</p>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={preferences.necessary}
                onChange={() => handleToggle("necessary")}
                disabled
              />
              <span className={styles.slider} />
            </label>
          </div>

          <div className={styles.option}>
            <div className={styles.optionInfo}>
              <div className={styles.optionHeader}>
                <h3>Analytics</h3>
                <div className={styles.badge}>Recommended</div>
              </div>
              <p>Help us understand how you use our product</p>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={() => handleToggle("analytics")}
              />
              <span className={styles.slider} />
            </label>
          </div>

          <div className={styles.option}>
            <div className={styles.optionInfo}>
              <div className={styles.optionHeader}>
                <h3>Marketing</h3>
              </div>
              <p>See personalized ads that match your interests</p>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={() => handleToggle("marketing")}
              />
              <span className={styles.slider} />
            </label>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.saveButton} onClick={handleSave}>
            Save Preferences
          </button>
          <button className={styles.acceptAllButton} onClick={handleAcceptAll}>
            Accept All
          </button>
        </div>

        <div className={styles.footer}>
          <a href="#" className={styles.link}>Privacy Policy</a>
          <span className={styles.dot}>•</span>
          <a href="#" className={styles.link}>Cookie Policy</a>
        </div>
      </div>
    </div>
  );
};
