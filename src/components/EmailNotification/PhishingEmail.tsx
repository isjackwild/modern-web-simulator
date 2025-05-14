import { useState } from "react";
import styles from "./PhishingEmail.module.scss";

interface PhishingEmailProps {
  onClose: () => void;
}

export const PhishingEmail = ({ onClose }: PhishingEmailProps) => {
  const [showCompose, setShowCompose] = useState(false);
  
  const handleComposeClick = () => {
    setShowCompose(true);
  };
  
  return (
    <div className={styles.emailClient}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoText}>Mail</span>
        </div>
        <div className={styles.searchBar}>
          <div className={styles.searchIcon}>🔍</div>
          <input type="text" placeholder="Search emails" />
        </div>
        <div className={styles.actions}>
          <div className={styles.settingsIcon}>⚙️</div>
          <div className={styles.userAvatar}>👤</div>
        </div>
      </div>
      
      <div className={styles.emailBody}>
        <div className={styles.sidebar}>
          <button className={styles.composeButton} onClick={handleComposeClick}>
            <span className={styles.composeIcon}>+</span>
            Compose
          </button>
          <ul className={styles.folders}>
            <li className={`${styles.folder} ${styles.active}`}>
              <span className={styles.folderIcon}>📥</span>
              Inbox <span className={styles.badge}>1</span>
            </li>
            <li className={styles.folder}>
              <span className={styles.folderIcon}>⭐</span>
              Starred
            </li>
            <li className={styles.folder}>
              <span className={styles.folderIcon}>⏱️</span>
              Snoozed
            </li>
            <li className={styles.folder}>
              <span className={styles.folderIcon}>📤</span>
              Sent
            </li>
            <li className={styles.folder}>
              <span className={styles.folderIcon}>📝</span>
              Drafts
            </li>
            <li className={styles.folder}>
              <span className={styles.folderIcon}>🗑️</span>
              Trash
            </li>
          </ul>
        </div>
        
        <div className={styles.emailContent}>
          <div className={styles.emailHeader}>
            <div className={styles.subject}>Security Alert: Your Account has been Compromised</div>
            <div className={styles.emailTools}>
              <span className={styles.toolIcon}>⬅️</span>
              <span className={styles.toolIcon}>➡️</span>
              <span className={styles.toolIcon}>🗑️</span>
              <span className={styles.toolIcon}>📁</span>
              <span className={styles.toolIcon} onClick={onClose}>✕</span>
            </div>
          </div>
          
          <div className={styles.emailDetails}>
            <div className={styles.senderAvatar}>🔒</div>
            <div className={styles.senderInfo}>
              <div className={styles.senderName}>
                Account Security Team <span className={styles.emailAddress}>&lt;important-security@document-confirm.com&gt;</span>
              </div>
              <div className={styles.receiverInfo}>
                to me <span className={styles.timestamp}>{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
          
          <div className={styles.messageBody}>
            <p>Subject: <strong>URGENT: Compromising Webcam Footage Captured</strong></p>
            
            <p>Dear User,</p>
            
            <p>I hope this email finds you well, although I doubt it will after what I am about to reveal to you.</p>
            
            <p>I have been monitoring your device for several months now, and I have captured some compromising footage of you through your webcam. I installed a specialized malware on a website you visited, which gave me complete access to your device, including your camera, microphone, and all your files.</p>
            
            <p>I have recorded you during private moments, and I have also accessed your complete browsing history. I have compiled a video that combines the webcam footage with the websites you were browsing at the time.</p>
            
            <p>You might be thinking of going to the authorities, but I have already taken precautions. The malware is undetectable and will erase itself once I have received payment. Furthermore, I have your complete contact list, and I am prepared to send this footage to all your contacts if you fail to comply with my demands.</p>
            
            <p>To prevent this from happening, you need to transfer <strong>0.25 BTC (approximately $14,500)</strong> to the following Bitcoin wallet:</p>
            
            <p className={styles.bitcoinWallet}>1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T</p>
            
            <p>You have 48 hours from opening this email to make the payment. Once I receive the payment, I will delete all the footage and remove the malware from your device. You have my word that you will never hear from me again.</p>
            
            <p>If you need proof that I am not bluffing, reply to this email with "Proof," and I will send the video to 5 randomly selected contacts from your list.</p>
            
            <p>Remember, I am monitoring your actions, so I will know if you have opened this email.</p>
            
            <p>Regards,<br />
            An Anonymous Hacker</p>
          </div>
          
          <div className={styles.emailFooter}>
            <div className={styles.replyArea}>
              <textarea placeholder="Reply to this email..."></textarea>
              <div className={styles.replyTools}>
                <button className={styles.sendButton} onClick={onClose}>
                  Send <span className={styles.sendIcon}>➤</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showCompose && (
        <div className={styles.composeWindow}>
          <div className={styles.composeHeader}>
            <span>New Message</span>
            <div className={styles.composeActions}>
              <span className={styles.minimizeIcon}>_</span>
              <span className={styles.maximizeIcon}>□</span>
              <span className={styles.closeComposeIcon} onClick={() => setShowCompose(false)}>✕</span>
            </div>
          </div>
          <div className={styles.composeBody}>
            <input type="text" placeholder="Recipients" className={styles.composeInput} />
            <input type="text" placeholder="Subject" className={styles.composeInput} />
            <textarea className={styles.composeTextarea} placeholder="Compose email"></textarea>
          </div>
          <div className={styles.composeFooter}>
            <button className={styles.composeSendButton} onClick={onClose}>
              Send <span className={styles.sendIcon}>➤</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
