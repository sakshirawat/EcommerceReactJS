import React from 'react';
import styles from './PrivacyPolicy.module.css'

const PrivacyPolicy = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Privacy Policy</h1>

      <p className={styles.paragraph}>
        Soroto is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information.
      </p>

      <h2 className={styles.sectionTitle}>Information Collection</h2>
      <p className={styles.paragraph}>
        We collect information you provide when you register, purchase, or contact us.
      </p>

      <h2 className={styles.sectionTitle}>Use of Information</h2>
      <p className={styles.paragraph}>
        Your data is used to provide and improve our services, process transactions, and communicate with you.
      </p>

      <h2 className={styles.sectionTitle}>Data Security</h2>
      <p className={styles.paragraph}>
        We use appropriate security measures to protect your information.
      </p>

      {/* Add more sections as needed */}
    </div>
  );
};

export default PrivacyPolicy;
