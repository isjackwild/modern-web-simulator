import { useEffect, useState } from "react";
import styles from "./VideoAd.module.scss";
import video from "./memecoin.mp4";

interface VideoAdProps {
  onRemove: () => void;
}

export const VideoAd = ({ onRemove }: VideoAdProps) => {
  const [countdown, setCountdown] = useState(10);
  const [hasWatched5Seconds, setHasWatched5Seconds] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setHasWatched5Seconds(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.videoContent}>
        <div className={styles.gradientOverlay} />

        {/* Video Background */}
        <video autoPlay muted loop className={styles.video}>
          <source src={video} type="video/mp4" />
        </video>

        {/* Ad Content */}
        <div className={styles.adContent}>
          <div className={styles.topBar}>
            <div className={styles.adLabel}>Advertisement</div>
            <div className={styles.skipContainer}>
              {hasWatched5Seconds ? (
                <button onClick={onRemove} className={styles.skipButton}>
                  Skip Ad
                </button>
              ) : (
                <div className={styles.countdown}>
                  <div
                    className={styles.progressBar}
                    style={{
                      transform: `scaleX(${countdown / 10})`,
                    }}
                  />
                  <span>Skip ad in {countdown}</span>
                </div>
              )}
            </div>
          </div>

          <div className={styles.mainContent}>
            <h1>
              <span className={styles.highlight}>MEMECOIN MASTERY 2025</span>
              <br />
              Turn $100 into $1,000,000
            </h1>

            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.emoji}>🚀</span>
                Early Access to New Coins
              </div>
              <div className={styles.feature}>
                <span className={styles.emoji}>💎</span>
                Proven Trading Strategies
              </div>
              <div className={styles.feature}>
                <span className={styles.emoji}>📈</span>
                Real Success Stories
              </div>
            </div>

            <div className={styles.cta}>
              <div className={styles.price}>
                <span className={styles.oldPrice}>$997</span>
                <span className={styles.newPrice}>$47</span>
              </div>
              <button className={styles.ctaButton}>
                GET INSTANT ACCESS 🔥
              </button>
              <div className={styles.limitedOffer}>
                ⚡️ 95% OFF - Limited Time Offer
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
