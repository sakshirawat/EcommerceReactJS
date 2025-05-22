import React from 'react';
import styles from './TermsAndCondition.module.css';

const TermsAndCondition = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Terms & Conditions</h1>
      <p className={styles.paragraph}>
        Welcome to Soroto. By using our website, you agree to comply with and be bound by the following terms and conditions.
      </p>

      <h2 className={styles.sectionTitle}>Use of the Site</h2>
      <p className={styles.paragraph}>
        You agree to use the site only for lawful purposes and in a way that does not infringe the rights of others.
      </p>

      <h2 className={styles.sectionTitle}>Intellectual Property</h2>
      <p className={styles.paragraph}>
        All content on this site, including logos and images, are our property or used with permission.
      </p>

      <h2 className={styles.sectionTitle}>Limitation of Liability</h2>
      <p className={styles.paragraph}>
        We are not liable for any damages arising from the use of this website.
      </p>

      {/* Add more sections as needed */}
    </div>
  );
};

export default TermsAndCondition;
