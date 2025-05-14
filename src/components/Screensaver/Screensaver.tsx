import { useState, useMemo } from "react";
import styles from "./Screensaver.module.scss";

interface ScreensaverProps {
  onRemove: () => void;
}

export const Screensaver = ({ onRemove }: ScreensaverProps) => {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  
  // Generate random bubbles for the screensaver animation - using useMemo to prevent regeneration on every render
  const bubbles = useMemo(() => {
    const bubbleArray = [];
    const colors = [
      'blue', 'purple', 'teal', 'pink', 'orange', 'green'
    ];
    
    for (let i = 0; i < 40; i++) {
      bubbleArray.push({
        id: i,
        size: Math.random() * 80 + 40,
        xPos: Math.random() * 100,
        yPos: Math.random() * 100,
        speed: Math.random() * 20 + 5,
        delay: Math.random() * 2, // Reduced delay so bubbles start sooner
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    return bubbleArray;
  }, []); // Empty dependency array means this only runs once
  
  const handleScreenClick = () => {
    if (!showLogin) {
      setShowLogin(true);
    }
  };
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate login attempt
    if (username.trim().length > 0 && password.trim().length > 0) {
      // Login successful
      setTimeout(onRemove, 300);
    } else {
      // Login failed
      setError(true);
      setPassword("");
    }
  };
  
  return (
    <div className={styles.container}>
      <div 
        className={styles.screensaver} 
        onClick={handleScreenClick}
      >
        <div className={styles.bubblesContainer}>
          {bubbles.map((bubble) => (
            <div
              key={bubble.id}
              className={styles.bubble}
              style={{
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                left: `${bubble.xPos}%`,
                top: `${bubble.yPos}%`,
                animationDuration: `${bubble.speed}s`,
                animationDelay: `${bubble.delay}s`
              }}
              data-color={bubble.color}
            />
          ))}
        </div>
        
        {!showLogin ? (
          <>
            <div className={styles.timeDisplay}>
              <div className={styles.time}>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              <div className={styles.date}>{new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}</div>
            </div>
            <div className={styles.instructions}>Click anywhere to login</div>
          </>
        ) : (
          <div className={styles.loginContainer}>
            <div className={styles.loginHeader}>
              <div className={styles.avatar}>
                <span className={styles.avatarIcon}>👤</span>
              </div>
              <div className={styles.systemName}>User Account</div>
            </div>
            
            <form className={styles.loginForm} onSubmit={handleLogin}>
              {error && (
                <div className={styles.errorMessage}>
                  Incorrect username or password
                </div>
              )}
              
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError(false);
                  }}
                  className={`${styles.input} ${error ? styles.errorInput : ""}`}
                  autoFocus
                />
              </div>
              
              <div className={styles.inputGroup}>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  className={`${styles.input} ${error ? styles.errorInput : ""}`}
                />
              </div>
              
              <button type="submit" className={styles.loginButton}>
                Log In
              </button>
            </form>
            
            <div className={styles.additionalOptions}>
              <button className={styles.optionButton}>Forgot Password</button>
              <button className={styles.optionButton}>Switch User</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
