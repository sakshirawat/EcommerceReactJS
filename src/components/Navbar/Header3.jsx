import React, { useState } from 'react';
import styles from './Header3.module.css';

const Header3 = ({ onCategorySelect }) => {
  const [showCategories, setShowCategories] = useState(false);

  const handleCategoryClick = (category) => {
    if (onCategorySelect) {
      onCategorySelect(category);
    }
  };

  const toggleCategories = () => {
    setShowCategories((prev) => !prev);
  };

  return (
    <nav className={styles.navbar}>
      {/* Browse Categories Toggle Button */}
      <button className={styles.hamburgerButton} onClick={toggleCategories}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={styles.hamburgerIcon}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <div><h5>BROWSE CATEGORIES</h5></div>
      </button>

      {/* Conditionally rendered category buttons */}
      {showCategories && (
        <div className={styles.categoryDropdowns}>
          <div className={styles.dropdown}>
            <button className={styles.dropdownButton} onClick={() => handleCategoryClick('electronics')}>
              ELECTRONICS
            </button>
          </div>
          <div className={styles.dropdown}>
            <button className={styles.dropdownButton} onClick={() => handleCategoryClick("men's clothing")}>
              MEN CLOTHING
            </button>
          </div>
          <div className={styles.dropdown}>
            <button className={styles.dropdownButton} onClick={() => handleCategoryClick("women's clothing")}>
              WOMEN CLOTHING
            </button>
          </div>
          <div className={styles.dropdown}>
            <button className={styles.dropdownButton} onClick={() => handleCategoryClick('jewelery')}>
              JEWELRY
            </button>
          </div>
        </div>
      )}

      <div className={styles.clearanceSale}>
        <h6>CLEARANCE SALE 30%</h6>
      </div>
    </nav>
  );
};

export default Header3;

