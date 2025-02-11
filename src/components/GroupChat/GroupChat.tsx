import { useState, useEffect } from "react";
import styles from "./GroupChat.module.scss";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isExiting?: boolean;
  isExited?: boolean;
}

interface GroupChatProps {
  onRemove: () => void;
}

const SENDERS = [
  "Sarah",
  "Mike",
  "Emma",
  "Alex",
  "James",
  "Lucy",
  "Tom",
  "Rachel",
  "Dan",
  "Sophie",
];
const PLACES = [
  "The Garden House",
  "Oak Street Cafe",
  "Café Verde",
  "Brunch & Co",
  "The Breakfast Club",
  "Morning Glory",
  "Sunny Side Up",
  "The Avocado Toast",
  "Wild Flour Bakery",
  "The Hungry Bear",
  "Cloud Nine Bistro",
  "The Rustic Table",
  "Farm to Fork",
  "The Coffee House",
  "Urban Plates",
  "The Local Kitchen",
  "Sweet & Savory",
  "The Pantry",
  "Harvest & Co",
  "The Daily Grind",
  "The Green Room",
  "Salt & Honey",
  "The Wooden Spoon",
  "Fresh Press Cafe",
  "The Lazy Daisy"
];
const REQUIREMENTS = [
  "needs to be dog-friendly",
  "must have vegan options",
  "should have outdoor seating",
  "needs to be kid-friendly",
  "needs to be Instagram-worthy",
  "has to have gluten-free options",
  "needs to be near public transport",
  "must have bottomless mimosas",
  "has to have good coffee",
  "needs strong WiFi",
  "must take reservations",
  "should have private rooms",
  "needs to be wheelchair accessible",
  "has to have plenty of outlets",
  "must serve all-day breakfast",
  "needs free parking",
  "has to have vegetarian options",
  "should be quiet enough for meetings",
  "needs to be open early",
  "must have dairy-free alternatives",
  "should have a loyalty program",
  "needs contactless payment",
  "has to have good lighting for photos",
  "must do takeout",
  "should have sustainable practices"
];
const COMPLAINTS = [
  "too expensive",
  "always packed",
  "service is slow",
  "portions are tiny",
  "too noisy",
  "tables are too small",
  "parking is a nightmare",
  "they don't take cards",
  "wifi is terrible",
  "coffee is always lukewarm",
  "they're always out of avocados",
  "the music is too loud",
  "the chairs are uncomfortable",
  "it's too dark inside",
  "the menu is too limited",
  "they changed their recipe",
  "the line is always huge",
  "they don't do substitutions",
  "the AC is too strong",
  "they rush you out",
  "the website menu is outdated",
  "they don't split bills",
  "the bathroom is tiny",
  "their app never works",
  "they're always understaffed"
];

function generateMessage(id: number): Message {
  const hour = Math.floor(Math.random() * 3) + 10;
  const minute = Math.floor(Math.random() * 60);
  const timestamp = `${hour}:${minute.toString().padStart(2, "0")}`;
  const sender = SENDERS[Math.floor(Math.random() * SENDERS.length)];

  let content = "";
  const messageType = Math.random();

  if (messageType < 0.2) {
    // Suggestion
    content = `What about ${
      PLACES[Math.floor(Math.random() * PLACES.length)]
    }?`;
  } else if (messageType < 0.4) {
    // Requirement
    content = `It ${
      REQUIREMENTS[Math.floor(Math.random() * REQUIREMENTS.length)]
    } though 🤔`;
  } else if (messageType < 0.6) {
    // Complaint
    content = `Yeah but ${
      COMPLAINTS[Math.floor(Math.random() * COMPLAINTS.length)]
    } 😕`;
  } else if (messageType < 0.8) {
    // Question
    content = `Has anyone been to ${
      PLACES[Math.floor(Math.random() * PLACES.length)]
    } recently?`;
  } else {
    // Reaction
    const reactions = [
      "👍",
      "🤔",
      "😬",
      "🙄",
      "😩",
      "🤷‍♀️",
      "🤦‍♂️",
      "😅",
      "💯",
      "🙌",
    ];
    content = reactions[Math.floor(Math.random() * reactions.length)];
  }

  return { id, sender, content, timestamp };
}

export const GroupChat = ({ onRemove }: GroupChatProps) => {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [showMuteButton, setShowMuteButton] = useState(false);

  useEffect(() => {
    let currentId = 1;
    let timeouts: any[] = [];

    const addMessage = () => {
      const message = generateMessage(currentId);
      setVisibleMessages((prev) => [
        ...prev.filter((m) => !m.isExited),
        message,
      ]);

      // Remove message after random duration between 4-6 seconds
      const removeTimeout = setTimeout(() => {
        setVisibleMessages((prev) =>
          prev.map((m) => (m.id === message.id ? { ...m, isExiting: true } : m))
        );

        setTimeout(() => {
          setVisibleMessages((prev) =>
            prev.map((m) =>
              m.id === message.id ? { ...m, isExited: true } : m
            )
          );
        }, 300);
      }, 3500);

      timeouts.push(removeTimeout);
      currentId++;

      // Schedule next message with random delay
      const nextDelay = 200 + Math.random() * 800;
      setTimeout(addMessage, nextDelay);
    };

    // Show mute button immediately
    setShowMuteButton(true);

    // Start the message chain
    addMessage();

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  const handleMute = () => {
    setVisibleMessages((prev) => prev.map((m) => ({ ...m, isExiting: true })));
    setTimeout(onRemove, 300);
  };

  return (
    <div className={styles.container}>
      {showMuteButton && (
        <button className={styles.muteButton} onClick={handleMute}>
          <svg viewBox="0 0 24 24" className={styles.muteIcon}>
            <path
              fill="currentColor"
              d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"
            />
          </svg>
          Mute Notifications
        </button>
      )}
      <div className={styles.notifications}>
        {visibleMessages.map((message) => (
          <div
            data-id={message.id}
            key={message.id}
            className={`${styles.notification} ${
              message.isExiting ? styles.exit : ""
            }`}
          >
            <div className={styles.appIcon}>
              <svg viewBox="0 0 24 24" className={styles.messageIcon}>
                <path
                  fill="currentColor"
                  d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M6,9H18V11H6M14,14H6V12H14M18,8H6V6H18"
                />
              </svg>
            </div>
            <div className={styles.content}>
              <div className={styles.header}>
                <span className={styles.appName}>Messages</span>
                <span className={styles.time}>{message.timestamp}</span>
              </div>
              <div className={styles.title}>Saturday Brunch</div>
              <div className={styles.message}>
                <strong>{message.sender}:</strong> {message.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
