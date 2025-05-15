import { useState } from "react";
import styles from "./WhatsNew.module.scss";
import classNames from "classnames";
import whatsNewVideo from "./whatsnew.mp4";
import dashboardVideo from "./dashboard.mp4";
import collaborationVideo from "./collaboration.mp4";
import performanceVideo from "./performance.mp4";

interface WhatsNewProps {
  onRemove: () => void;
}

const WELCOME_SCREEN = {
  title: "✨ DISCOVER WHAT'S NEW\nIN OUR GENERIC SAAS!",
  video: whatsNewVideo,
};

const FEATURES = [
  {
    title: "🚀 Revolutionary AI-Powered Dashboard",
    video: dashboardVideo,
  },
  {
    title: "✨ Game-Changing Collaboration Tools",
    video: collaborationVideo,
  },
  {
    title: "🎯 Mind-Blowing Performance Upgrades",
    video: performanceVideo,
  },
];

export function WhatsNew({ onRemove }: WhatsNewProps) {
  const [currentStep, setCurrentStep] = useState(-1);

  const handleNext = () => {
    if (currentStep < FEATURES.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onRemove();
    }
  };

  const handleSkip = () => {
    onRemove();
  };

  return (
    <>
      <div className={styles.overlay} />
      <div className={styles.container}>
        <h2 className={styles.title}>
          {currentStep === -1
            ? WELCOME_SCREEN.title
            : FEATURES[currentStep].title}
        </h2>
        <div className={styles.videoContainer}>
          <video
            src={
              currentStep === -1
                ? WELCOME_SCREEN.video
                : FEATURES[currentStep].video
            }
            className={styles.video}
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
        <div className={styles.controls}>
          <div className={styles.stepIndicator}>
            {[-1, ...Array(FEATURES.length).keys()].map((index) => (
              <div
                key={index}
                className={classNames(styles.step, {
                  [styles.active]: index === currentStep,
                })}
              />
            ))}
          </div>
          <div className={styles.buttons}>
            <button
              className={classNames(styles.button, styles.secondary)}
              // onClick={handleSkip}
            >
              Skip tour
            </button>
            <button
              className={classNames(styles.button, styles.primary)}
              onClick={handleNext}
            >
              {currentStep === -1
                ? "Show me what's new!"
                : currentStep === FEATURES.length - 1
                ? "Get started!"
                : "Next feature"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
