import React from 'react';
import styles from './header2.module.css';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header2 = ({ onSearch }) => {
  const user = useSelector((state) => state.user.currentUser);

  // Local handler to send input value up on change
  const handleInputChange = (e) => {
    if(onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Search input field */}
        <div className={styles.searchSection}>
          <input
            type="text"
            placeholder="Search products..."
            className={styles.searchInput}
            onChange={handleInputChange}
          />
        </div>

        {/* Right section: Wishlist & Cart */}
        <div className={styles.navRightSection}>
          {user ? (
            <Link to="/wishlist" className={styles.icon}>
              <FaHeart size={24} />
              <span className={styles.iconLabel}>Wishlist</span>
            </Link>
          ) : (
            <div
              className={styles.icon}
              onClick={() => alert('Please sign in first!')}
            >
              <FaHeart size={24} />
              <span className={styles.iconLabel}>Wishlist</span>
            </div>
          )}

          {user ? (
            <Link to="/cart" className={styles.icon}>
              <FaShoppingCart size={24} />
              <span className={styles.iconLabel}>Cart</span>
            </Link>
          ) : (
            <div
              className={styles.icon}
              onClick={() => alert('Please sign in first!')}
            >
              <FaShoppingCart size={24} />
              <span className={styles.iconLabel}>Cart</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header2;
