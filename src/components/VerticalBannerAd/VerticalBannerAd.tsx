import { useEffect, useState } from "react";
import styles from "./VerticalBannerAd.module.scss";

interface VerticalBannerAdProps {
  onRemove: () => void;
}

const FEEDBACK_OPTIONS = [
  "Not interested in holidays",
  "Price too expensive",
  "Already booked a holiday",
  "Seen this ad too many times",
  "Ad is too distracting",
  "Other",
];

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const VerticalBannerAd = ({ onRemove }: VerticalBannerAdProps) => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCloseClick = () => {
    setShowFeedbackModal(true);
  };

  const handleSubmitFeedback = () => {
    if (!selectedReason) return;
    setShowFeedbackModal(false);
    setIsClosing(true);
    setTimeout(onRemove, 300);
  };

  return (
    <div className={`${styles.container} ${isClosing ? styles.closing : ""}`}>
      <button className={styles.closeButton} onClick={handleCloseClick}>
        ×
      </button>

      <div className={styles.adContent}>
        <div className={styles.dealHeader}>
          <h1>JetAway Holidays</h1>
          <div className={styles.timer}>
            <span className={styles.timerLabel}>Deal ends in:</span>
            <span className={styles.timerValue}>{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className={styles.dealImage}>
          <img
            src="https://www.limolane.com/wp-content/uploads/2024/05/how-to-see-costa-del-sol.jpg"
            alt="Costa Del Sol Beach"
          />
        </div>

        <div className={styles.dealContent}>
          <div className={styles.offer}>
            <span className={styles.kidsGo}>KIDS GO FREE!</span>
            <span className={styles.destination}>COSTA DEL SOL</span>
            <span className={styles.allInclusive}>ALL INCLUSIVE</span>
          </div>

          <div className={styles.price}>
            <span className={styles.amount}>£199</span>
            <span className={styles.perPerson}>per person</span>
          </div>

          <div className={styles.details}>
            <p>✓ 7 nights accommodation</p>
            <p>✓ Flights included</p>
            <p>✓ All meals & drinks</p>
            <p>✓ Kids club activities</p>
          </div>

          <button className={styles.bookNow}>BOOK NOW</button>
        </div>
      </div>

      {showFeedbackModal && (
        <div className={styles.feedbackOverlay}>
          <div className={styles.feedbackModal}>
            <h3>Help us improve your ad experience</h3>
            <p>Why don't you want to see this ad?</p>

            <div className={styles.options}>
              {FEEDBACK_OPTIONS.map((option) => (
                <label key={option} className={styles.option}>
                  <input
                    type="radio"
                    name="feedback"
                    value={option}
                    checked={selectedReason === option}
                    onChange={(e) => setSelectedReason(e.target.value)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>

            <div className={styles.actions}>
              <button
                className={styles.cancel}
                onClick={() => setShowFeedbackModal(false)}
              >
                Cancel
              </button>
              <button
                className={styles.submit}
                onClick={handleSubmitFeedback}
                disabled={!selectedReason}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
