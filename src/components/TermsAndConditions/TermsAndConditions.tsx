import { useEffect, useRef, useState } from "react";
import styles from "./TermsAndConditions.module.scss";

interface TermsAndConditionsProps {
  onRemove: () => void;
}

export const TermsAndConditions = ({ onRemove }: TermsAndConditionsProps) => {
  const [hasReachedBottom, setHasReachedBottom] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!contentRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    const isBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (isBottom && !hasReachedBottom) {
      setHasReachedBottom(true);
    }
  };

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    content.addEventListener("scroll", handleScroll);
    return () => content.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Terms and Conditions</h2>
        <div
          className={styles.content}
          ref={contentRef}
          onScroll={handleScroll}
        >
          <h3>1. Introduction and Acceptance of Terms</h3>
          <p>
            1.1. Welcome to our service ("Service"). These Terms and Conditions
            ("Terms") govern your access to and use of our website, mobile
            applications, and all related services provided by us.
          </p>
          <p>
            1.2. By accessing or using our Service, you acknowledge that you
            have read, understood, and agree to be bound by these Terms. If you
            disagree with any part of these Terms, you must not use our Service.
          </p>
          <p>
            1.3. These Terms constitute a legally binding agreement between you
            and us, effective as of the date of your first access to or use of
            the Service.
          </p>
          <p>
            1.4. We reserve the right to modify, amend, or update these Terms at
            any time, with or without prior notice. Your continued use of the
            Service following any modifications indicates your acceptance of
            such changes.
          </p>

          <h3>2. Comprehensive Definitions and Interpretations</h3>
          <p>
            2.1. "Service" encompasses all aspects of our platform, including
            but not limited to:
          </p>
          <p>2.1.1. Website and mobile applications</p>
          <p>2.1.2. All content, features, and functionality</p>
          <p>2.1.3. APIs and developer tools</p>
          <p>2.1.4. Customer support and related services</p>
          <p>2.1.5. Any future updates, modifications, or enhancements</p>
          <p>2.2. "User" refers to:</p>
          <p>2.2.1. Individual account holders</p>
          <p>2.2.2. Corporate or organizational representatives</p>
          <p>2.2.3. Guest users and temporary visitors</p>
          <p>2.2.4. API consumers and developers</p>
          <p>2.3. "Content" includes but is not limited to:</p>
          <p>2.3.1. Text, images, videos, and audio files</p>
          <p>2.3.2. User-generated content and submissions</p>
          <p>2.3.3. Comments, reviews, and feedback</p>
          <p>2.3.4. Metadata and technical information</p>

          <h3>3. Detailed User Obligations and Responsibilities</h3>
          <p>3.1. Age and Eligibility Requirements:</p>
          <p>
            3.1.1. You must be at least 18 years of age to create an account
          </p>
          <p>
            3.1.2. If you are between 13 and 18 years of age, you must have
            parental consent
          </p>
          <p>
            3.1.3. Special provisions apply for corporate or organizational
            accounts
          </p>
          <p>3.2. Account Creation and Maintenance:</p>
          <p>
            3.2.1. You must provide accurate, current, and complete information
          </p>
          <p>3.2.2. Regular updates of account information are required</p>
          <p>3.2.3. Security requirements for passwords and authentication</p>
          <p>3.3. Account Security Responsibilities:</p>
          <p>3.3.1. Maintaining password confidentiality</p>
          <p>3.3.2. Reporting unauthorized access</p>
          <p>3.3.3. Multi-factor authentication requirements</p>
          <p>3.3.4. Device security requirements</p>

          <h3>4. Extensive Intellectual Property Rights</h3>
          <p>4.1. Our Intellectual Property:</p>
          <p>4.1.1. Copyrights in all content and materials</p>
          <p>4.1.2. Trademarks, logos, and brand elements</p>
          <p>4.1.3. Patents and patent applications</p>
          <p>4.1.4. Trade secrets and proprietary information</p>
          <p>4.2. Limited License Grant:</p>
          <p>4.2.1. Scope of permitted use</p>
          <p>4.2.2. Restrictions on modification and distribution</p>
          <p>4.2.3. Commercial use limitations</p>
          <p>4.3. User-Generated Content Rights:</p>
          <p>4.3.1. Ownership retention by users</p>
          <p>4.3.2. License grant to us</p>
          <p>4.3.3. Third-party rights and clearances</p>

          <h3>5. Comprehensive Privacy Policy and Data Protection</h3>
          <p>5.1. Data Collection:</p>
          <p>5.1.1. Types of personal information collected</p>
          <p>5.1.2. Automatic data collection methods</p>
          <p>5.1.3. Third-party data sources</p>
          <p>5.2. Data Usage:</p>
          <p>5.2.1. Service improvement and optimization</p>
          <p>5.2.2. Marketing and communications</p>
          <p>5.2.3. Analytics and research</p>
          <p>5.3. Data Protection:</p>
          <p>5.3.1. Security measures and protocols</p>
          <p>5.3.2. Data retention policies</p>
          <p>5.3.3. Breach notification procedures</p>

          <h3>6. Detailed User Content Policies</h3>
          <p>6.1. Content Standards:</p>
          <p>6.1.1. Quality requirements</p>
          <p>6.1.2. Prohibited content categories</p>
          <p>6.1.3. Content moderation processes</p>
          <p>6.2. License Terms:</p>
          <p>6.2.1. Scope of license granted to us</p>
          <p>6.2.2. Sublicensing rights</p>
          <p>6.2.3. Territory and duration</p>
          <p>6.3. Content Removal:</p>
          <p>6.3.1. Grounds for removal</p>
          <p>6.3.2. Notice and takedown procedures</p>
          <p>6.3.3. Appeal processes</p>

          <h3>7. Comprehensive Prohibited Activities</h3>
          <p>7.1. Technical Restrictions:</p>
          <p>7.1.1. No reverse engineering</p>
          <p>7.1.2. No unauthorized access attempts</p>
          <p>7.1.3. No interference with security features</p>
          <p>7.2. Content Restrictions:</p>
          <p>7.2.1. No illegal or harmful content</p>
          <p>7.2.2. No intellectual property violations</p>
          <p>7.2.3. No misleading or fraudulent content</p>
          <p>7.3. Behavioral Restrictions:</p>
          <p>7.3.1. No harassment or abuse</p>
          <p>7.3.2. No spamming or bulk messaging</p>
          <p>7.3.3. No impersonation or misrepresentation</p>

          <h3>8. Detailed Termination Provisions</h3>
          <p>8.1. Grounds for Termination:</p>
          <p>8.1.1. Violation of Terms</p>
          <p>8.1.2. Extended inactivity</p>
          <p>8.1.3. Legal or regulatory requirements</p>
          <p>8.2. Termination Process:</p>
          <p>8.2.1. Notice requirements</p>
          <p>8.2.2. Appeal procedures</p>
          <p>8.2.3. Account deletion process</p>
          <p>8.3. Post-Termination:</p>
          <p>8.3.1. Data retention and deletion</p>
          <p>8.3.2. Surviving obligations</p>
          <p>8.3.3. Reinstatement conditions</p>

          <h3>9. Extensive Warranty Disclaimers</h3>
          <p>9.1. Service Warranties:</p>
          <p>9.1.1. No guarantee of uninterrupted service</p>
          <p>9.1.2. No warranty of fitness for purpose</p>
          <p>9.1.3. Third-party service disclaimers</p>
          <p>9.2. Content Warranties:</p>
          <p>9.2.1. No accuracy guarantees</p>
          <p>9.2.2. No endorsement of user content</p>
          <p>9.2.3. Third-party content disclaimers</p>
          <p>9.3. Technical Warranties:</p>
          <p>9.3.1. No compatibility guarantees</p>
          <p>9.3.2. No security guarantees</p>
          <p>9.3.3. No performance guarantees</p>

          <h3>10. Comprehensive Limitation of Liability</h3>
          <p>10.1. Types of Damages:</p>
          <p>10.1.1. Direct damages limitations</p>
          <p>10.1.2. Indirect damages exclusions</p>
          <p>10.1.3. Special damages exclusions</p>
          <p>10.2. Liability Caps:</p>
          <p>10.2.1. Monetary limitations</p>
          <p>10.2.2. Time limitations</p>
          <p>10.2.3. Jurisdictional variations</p>
          <p>10.3. Exceptions:</p>
          <p>10.3.1. Statutory rights</p>
          <p>10.3.2. Gross negligence</p>
          <p>10.3.3. Willful misconduct</p>

          <h3>11. Detailed Changes to Terms</h3>
          <p>11.1. Modification Process:</p>
          <p>11.1.1. Notice requirements</p>
          <p>11.1.2. Timing of changes</p>
          <p>11.1.3. User notification methods</p>
          <p>11.2. User Rights:</p>
          <p>11.2.1. Right to reject changes</p>
          <p>11.2.2. Account closure options</p>
          <p>11.2.3. Data portability rights</p>
          <p>11.3. Version Control:</p>
          <p>11.3.1. Archive of previous versions</p>
          <p>11.3.2. Change tracking</p>
          <p>11.3.3. Effective dates</p>

          <h3>12. Comprehensive Governing Law and Jurisdiction</h3>
          <p>12.1. Choice of Law:</p>
          <p>12.1.1. Applicable jurisdiction</p>
          <p>12.1.2. Conflict of laws principles</p>
          <p>12.1.3. International law applicability</p>
          <p>12.2. Dispute Resolution:</p>
          <p>12.2.1. Mandatory arbitration provisions</p>
          <p>12.2.2. Class action waiver</p>
          <p>12.2.3. Small claims exception</p>
          <p>12.3. Venue:</p>
          <p>12.3.1. Court selection</p>
          <p>12.3.2. Alternative dispute resolution</p>
          <p>12.3.3. International enforcement</p>

          <h3>13. Additional Legal Provisions</h3>
          <p>13.1. Force Majeure:</p>
          <p>13.1.1. Definition of force majeure events</p>
          <p>13.1.2. Notice requirements</p>
          <p>13.1.3. Mitigation obligations</p>
          <p>13.2. Assignment:</p>
          <p>13.2.1. Restrictions on assignment</p>
          <p>13.2.2. Permitted assignments</p>
          <p>13.2.3. Notice requirements</p>
          <p>13.3. Severability:</p>
          <p>13.3.1. Effect of invalid provisions</p>
          <p>13.3.2. Reformation of invalid provisions</p>
          <p>13.3.3. Survival of remaining provisions</p>

          <h3>14. Contact Information and Legal Notices</h3>
          <p>14.1. Contact Methods:</p>
          <p>14.1.1. General inquiries: support@example.com</p>
          <p>14.1.2. Legal notices: legal@example.com</p>
          <p>14.1.3. Data protection: privacy@example.com</p>
          <p>14.2. Notice Requirements:</p>
          <p>14.2.1. Form of notices</p>
          <p>14.2.2. Timing requirements</p>
          <p>14.2.3. Proof of delivery</p>
          <p>14.3. Address for Notices:</p>
          <p>
            14.3.1. Physical address: 123 Legal Street, Suite 100, Example City,
            ST 12345
          </p>
          <p>14.3.2. Electronic submission methods</p>
          <p>14.3.3. Update procedures</p>

          <div className={styles.bottomIndicator}>
            {!hasReachedBottom && (
              <p>
                Please scroll to the bottom to accept the terms and conditions
              </p>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.decline}
            onClick={onRemove}
            disabled={!hasReachedBottom}
          >
            Decline
          </button>
          <button
            className={styles.accept}
            onClick={onRemove}
            disabled={!hasReachedBottom}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};
