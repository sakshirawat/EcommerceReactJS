import React from 'react';
import styles from './Footer.module.css'; 
import logo from '../../images/logo.jpeg';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>

        <div className={styles.footerColumn}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <p className={styles.logoText}>SOROTO</p>
        </div>

        <div className={styles.footerColumn}>
          <h4>Call Us</h4>
          <p>+1 234 567 890</p>
          <p>info@sorto.com</p>
          <p>Visit US</p>
        </div>

        {/* Wrap Useful Links and My Account columns inside a flex container */}
        <div className={styles.footerLinksRow}>
          <div className={styles.footerColumn}>
            <h4>Useful Links</h4>
            <ul>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h4>My Account</h4>
            <ul>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/orders">My Orders</Link></li>
              <li><Link to="/settings">Settings</Link></li>
            </ul>
          </div>
        </div>

      </div>

      <div className={styles.footerBottom}>
        <p>&copy; 2025 soroto. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
