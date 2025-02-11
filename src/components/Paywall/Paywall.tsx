import { useState } from "react";
import styles from "./Paywall.module.scss";

interface PaywallProps {
  onRemove: () => void;
}

export const Paywall = ({ onRemove }: PaywallProps) => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === "cardNumber") {
      formattedValue =
        value
          .replace(/\s/g, "")
          .match(/.{1,4}/g)
          ?.join(" ") || "";
    }
    // Format expiry date with slash
    if (name === "expiry") {
      formattedValue = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(onRemove, 1500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.blurOverlay} />
        <div className={styles.paywallContent}>
          {!showPaymentForm ? (
            <div className={styles.offer}>
              <h2>You've reached your free keystroke limit</h2>
              <p className={styles.subtitle}>
                Become a subscriber to continue typing and unlock all features
              </p>

              <div className={styles.benefits}>
                <div className={styles.benefit}>
                  <span className={styles.checkmark}>✓</span>
                  Unlimited keystrokes
                </div>
                <div className={styles.benefit}>
                  <span className={styles.checkmark}>✓</span>
                  Premium keyboard sounds
                </div>
                <div className={styles.benefit}>
                  <span className={styles.checkmark}>✓</span>
                  Exclusive typing analytics
                </div>
                <div className={styles.benefit}>
                  <span className={styles.checkmark}>✓</span>
                  Ad-free experience
                </div>
              </div>

              <div className={styles.subscriptionOptions}>
                <div className={styles.option}>
                  <div className={styles.badge}>BEST VALUE</div>
                  <h3>Annual</h3>
                  <div className={styles.price}>
                    <span className={styles.amount}>£89.99</span>
                    <span className={styles.period}>/year</span>
                  </div>
                  <div className={styles.savings}>Save 40%</div>
                </div>
                <div className={styles.option}>
                  <h3>Monthly</h3>
                  <div className={styles.price}>
                    <span className={styles.amount}>£12.99</span>
                    <span className={styles.period}>/month</span>
                  </div>
                </div>
              </div>

              <button
                className={styles.subscribeButton}
                onClick={() => setShowPaymentForm(true)}
              >
                Subscribe Now
              </button>

              <p className={styles.terms}>
                By subscribing you agree to our Terms of Service and Privacy
                Policy. Cancel anytime.
              </p>
            </div>
          ) : (
            <div className={styles.paymentForm}>
              <h2>Complete your subscription</h2>
              <p className={styles.subtitle}>
                Enter your payment details to continue
              </p>

              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Cardholder Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Smith"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="expiry">Expiry Date</label>
                    <input
                      type="text"
                      id="expiry"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      maxLength={3}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className={styles.paymentButton}>
                  Complete Subscription
                </button>

                <button
                  type="button"
                  className={styles.backButton}
                  onClick={() => setShowPaymentForm(false)}
                >
                  Back
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
