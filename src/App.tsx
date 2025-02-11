import { useState, useMemo, useEffect } from "react";
import { CookieChoices } from "./components/CookieChoices/CookieChoices";
import { TermsAndConditions } from "./components/TermsAndConditions/TermsAndConditions";
import { TouchSecurityKey } from "./components/TouchSecurityKey/TouchSecurityKey";
import { VerticalBannerAd } from "./components/VerticalBannerAd/VerticalBannerAd";
import { Paywall } from "./components/Paywall/Paywall";
import { VideoAd } from "./components/VideoAd/VideoAd";
import { IncomingVideoCall } from "./components/IncomingVideoCall/IncomingVideoCall";
import { InstallDependencies } from "./components/InstallDependencies/InstallDependencies";
import { AdminPassword } from "./components/AdminPassword/AdminPassword";
import { GroupChat } from "./components/GroupChat/GroupChat";
import styles from "./App.module.scss";

enum Interruption {
  NONE,
  COOKIES,
  TERMS,
  SECURITY_KEY,
  VERTICAL_AD,
  PAYWALL,
  VIDEO_AD,
  INCOMING_CALL,
  INSTALL_DEPENDENCIES,
  ADMIN_PASSWORD,
  GROUP_CHAT,
}

const INTERRUPTION_ORDER = [
  Interruption.COOKIES,
  Interruption.TERMS,
  Interruption.SECURITY_KEY,
  Interruption.VERTICAL_AD,
  Interruption.PAYWALL,
  Interruption.VIDEO_AD,
  Interruption.INCOMING_CALL,
  Interruption.INSTALL_DEPENDENCIES,
  Interruption.ADMIN_PASSWORD,
  Interruption.GROUP_CHAT,
];

function App() {
  const [currentInterruption, setCurrentInterruption] = useState<Interruption>(
    Interruption.ADMIN_PASSWORD
  );
  const [currentIndex, setCurrentIndex] = useState(-1);

  const iframeUrl = useMemo(() => {
    const url = new URL("https://hydra.ojack.xyz/");
    url.searchParams.set("modern_web_simulator", "true");
    return url.toString();
  }, []);

  // useEffect(() => {
  //   // Start the sequence after 20 seconds
  //   const initialTimer = setTimeout(() => {
  //     setCurrentIndex(0);
  //     setCurrentInterruption(INTERRUPTION_ORDER[0]);
  //   }, 20000);

  //   return () => clearTimeout(initialTimer);
  // }, []);

  const handleInterruptionClose = () => {
    setCurrentInterruption(Interruption.ADMIN_PASSWORD);

    // Schedule next interruption after 20 seconds
    // const nextIndex = currentIndex + 1;
    // if (nextIndex < INTERRUPTION_ORDER.length) {
    //   setTimeout(() => {
    //     setCurrentIndex(nextIndex);
    //     setCurrentInterruption(INTERRUPTION_ORDER[nextIndex]);
    //   }, 20000);
    // }
  };

  const renderInteruption = () => {
    switch (currentInterruption) {
      case Interruption.NONE:
        return null;
      case Interruption.COOKIES:
        return <CookieChoices onRemove={handleInterruptionClose} />;
      case Interruption.TERMS:
        return <TermsAndConditions onRemove={handleInterruptionClose} />;
      case Interruption.SECURITY_KEY:
        return <TouchSecurityKey onRemove={handleInterruptionClose} />;
      case Interruption.VERTICAL_AD:
        return <VerticalBannerAd onRemove={handleInterruptionClose} />;
      case Interruption.PAYWALL:
        return <Paywall onRemove={handleInterruptionClose} />;
      case Interruption.VIDEO_AD:
        return <VideoAd onRemove={handleInterruptionClose} />;
      case Interruption.INCOMING_CALL:
        return <IncomingVideoCall onRemove={handleInterruptionClose} />;
      case Interruption.INSTALL_DEPENDENCIES:
        return <InstallDependencies onRemove={handleInterruptionClose} />;
      case Interruption.ADMIN_PASSWORD:
        return <AdminPassword onRemove={handleInterruptionClose} />;
      case Interruption.GROUP_CHAT:
        return <GroupChat onRemove={handleInterruptionClose} />;
    }
  };

  return (
    <div className={styles.container}>
      <iframe
        src={iframeUrl}
        className={styles.iframe}
        title="Website Content"
      />
      {renderInteruption()}
    </div>
  );
}

export default App;
