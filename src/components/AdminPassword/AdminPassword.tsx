import { useState } from "react";
import styles from "./AdminPassword.module.scss";
import javaIcon from "./java-icon.png";

interface AdminPasswordProps {
  onRemove: () => void;
}

export const AdminPassword = ({ onRemove }: AdminPasswordProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Accept any non-empty username/password combination
    if (username.trim() && password.trim()) {
      setShowSuccess(true);
      setTimeout(onRemove, 1500);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.titleBar}>
          <img src={javaIcon} alt="Java Icon" className={styles.icon} />
          <span>Java™ Update Required</span>
          <button className={styles.closeButton} onClick={onRemove}>
            <span>×</span>
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.shield} />
            <p>Windows needs your permission to continue</p>
          </div>
          <div className={styles.message}>
            An application is requesting system administrator privileges to install:
            <br />
            <strong>Java™ Runtime Environment 1.4.2_06</strong>
            <br />
            <br />
            Publisher: Sun Microsystems, Inc.
            <br />
            Location: C:\WINDOWS\system32\
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="username">User name:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {showSuccess && (
              <div className={styles.successMessage}>
                Verifying credentials...
              </div>
            )}
            <div className={styles.buttons}>
              <button type="submit" className={styles.button}>
                OK
              </button>
              <button
                type="button"
                className={styles.button}
                onClick={onRemove}
              >
                Cancel
              </button>
            </div>
          </form>
          <div className={styles.footer}>
            <div className={styles.info}>
              To continue, type an administrator password, and then click OK.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
