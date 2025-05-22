import React, { useState } from 'react';
import styles from './SignIn.module.css';
import { useNavigate } from 'react-router-dom';  
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/userSlice';

const SignIn = () => {
  // State variables for user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Error state to track validation messages
  const [errors, setErrors] = useState({ email: '', password: '', credentials: '' });

  // React Router hook to navigate programmatically
  const navigate = useNavigate();

  // Redux dispatch to update global user state
  const dispatch = useDispatch();

  // Function to validate email and password inputs
  const validateInputs = () => {
    const newErrors = { email: '', password: '', credentials: '' };
    let valid = true;
  
    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }
  
    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    }
  
    setErrors(newErrors);
    return valid;
  };
  
  // Handlers for input changes and clearing credential error message
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.credentials) setErrors(prev => ({ ...prev, credentials: '' }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.credentials) setErrors(prev => ({ ...prev, credentials: '' }));
  };

  // Submit handler for login form
  function handleSubmitSignIn(e) {
    e.preventDefault();
  
    const isValid = validateInputs();
    if (!isValid) return;

    // Retrieve users from localStorage (if any)
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Fallback test user (for development/demo)
    const testUsers = [
      { email: 'test@example.com', password: 'pass123', name: 'Test User' },
    ];

    // Combine both lists
    const users = [...storedUsers, ...testUsers];

    // Attempt to match entered credentials with existing users
    const loggedInUser = users.find(
      (user) => user.email === email && user.password === password
    );

    // Show error if credentials don't match
    if (!loggedInUser) {
      setErrors(prev => ({ ...prev, credentials: 'Incorrect email or password' }));
      return;
    }

    // Log user in via Redux and redirect to homepage
    dispatch(userActions.signIn(loggedInUser));
    navigate('/');
  }

  return (
    <div>
      <div className={styles.modalContainer}>
        <div className={styles.modalBackground}></div>

        <div className={styles.modalDialog}>
          <h2>Sign In</h2>

          {/* Sign-in form */}
          <form onSubmit={handleSubmitSignIn} noValidate>
            {/* Email input field */}
            <div>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                className={styles.modalInput}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                autoComplete="email"
              />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>

            {/* Password input field */}
            <div>
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                className={styles.modalInput}
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                autoComplete="current-password"
              />
              {errors.password && <p className={styles.error}>{errors.password}</p>}
            </div>

            {/* Error message for invalid credentials */}
            {errors.credentials && <p className={styles.error}>{errors.credentials}</p>}

            {/* Submit button */}
            <button className={styles.modalButton} type="submit">
              Submit
            </button>
          </form>

          {/* Close button to navigate back */}
          <button className={styles.modalButton} onClick={() => navigate('/', { replace: true })}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
