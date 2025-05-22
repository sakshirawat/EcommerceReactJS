import React from 'react';
import styles from './FAQ.module.css';

const FAQ = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Frequently Asked Questions</h1>
      
      <h3 className={styles.question}>1. How do I create an account?</h3>
      <p className={styles.answer}>
        You can sign up by clicking the Sign Up button on the homepage and filling out the registration form.
      </p>

      <h3 className={styles.question}>2. How can I track my order?</h3>
      <p className={styles.answer}>
        After placing an order, you can track it through your profile under "My Orders".
      </p>

      <h3 className={styles.question}>3. What payment methods do you accept?</h3>
      <p className={styles.answer}>
        We accept major credit cards, debit cards, and PayPal.
      </p>

      <h3 className={styles.question}>4. How do I contact customer support?</h3>
      <p className={styles.answer}>
        You can reach out via the Contact Us page or email us at info@sorto.com.
      </p>
    </div>
  );
};

export default FAQ;
