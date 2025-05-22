import React from 'react';
import styles from './header1.module.css';
import logo from '../../images/logo.jpeg';
import { Link, useNavigate } from 'react-router-dom'; // Link added for navigation
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/userSlice';

const Header1 = () => {
  const navigate = useNavigate(); // Still needed for logout redirect
  const dispatch = useDispatch();

  // Get current user from Redux store
  const user = useSelector((state) => state.user.currentUser);
  

  // Handle logout functionality
  const handleLogout = () => {
    dispatch(userActions.logOut());
    navigate('/'); // Redirect to home after logout
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Logo and brand text */}
        <div className={styles.logoSection}>
          <img src={logo} alt="logo" className={styles.logoImg} />
          <h2 className={styles.logoText}>Sroto</h2>
          <h6 style={{ marginTop: '30px' }}>"Where Fashion Meets You."</h6>
        </div>

        {/* Right section: currency, language, auth */}
        <div className={styles.navRightSection}>
          {/* Currency dropdown */}
          <div className={styles.dropdown}>
            <button className={styles.dropdownButton}>Currency ▾</button>
            <ul className={styles.dropdownMenu}>
              <li className={styles.dropdownItem}>USD</li>
              <li className={styles.dropdownItem}>EUR</li>
              <li className={styles.dropdownItem}>INR</li>
            </ul>
          </div>

          {/* Language dropdown */}
          <div className={styles.dropdown}>
            <button className={styles.dropdownButton}>Language ▾</button>
            <ul className={styles.dropdownMenu}>
              <li className={styles.dropdownItem}>English</li>
              <li className={styles.dropdownItem}>German</li>
              <li className={styles.dropdownItem}>Spanish</li>
            </ul>
          </div>

          {/* Authentication links */}
          <div className={styles.authLinks}>
            {user ? (
              // If user is logged in, show welcome message and logout
              <span className={styles.username}>
                Welcome! {user.name}
                <button onClick={handleLogout} className={styles.signOutButton}>
                  LogOut
                </button>
              </span>
            ) : (
              // If not logged in, show sign in/sign up buttons using Link
              <>
                <Link to="/signin" className={styles.signInLink}>
                  Sign In
                </Link>
                <Link to="/signup" className={styles.signUpButton}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header1;
