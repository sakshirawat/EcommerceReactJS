import React, { useState } from 'react';
import styles from './SignUp.module.css';
import { useNavigate } from 'react-router-dom';  

const SignUp = () => {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State to track validation errors
  const [errors, setErrors] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const navigate = useNavigate(); 

  // Validation function
  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '', password: '', confirmPassword: '' };

    // Name validation
    if (!name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    // Email format validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    // Set error messages to state
    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  function handleSubmitSignUp(e) {
    e.preventDefault();

    if (!validateForm()) return; // Stop submission if form is invalid

    // Create new user object
    const submittedData = { name, email, password };

    let existingUsers = [];

    // Safely retrieve existing users from localStorage
    try {
      const stored = JSON.parse(localStorage.getItem('users'));
      if (Array.isArray(stored)) {
        existingUsers = stored;
      }
    } catch {
      existingUsers = [];
    }

    // Save new user to localStorage
    existingUsers.push(submittedData);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // Navigate to Sign In page after successful registration
    navigate('/signin');
  }

  return (
    <div>
      <div className={styles.modalContainer}>
        <div className={styles.modalBackground}></div>

        <div className={styles.modalDialog}>
          <h2>Sign Up</h2>

          {/* Sign Up form */}
          <form onSubmit={handleSubmitSignUp}>
            {/* Name Input */}
            <div>
              <label>Name:</label>
              <input
                className={styles.modalInput}
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label>Email:</label>
              <input
                className={styles.modalInput}
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div>
              <label>Password:</label>
              <input
                className={styles.modalInput}
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className={styles.error}>{errors.password}</p>}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label>Confirm Password:</label>
              <input
                className={styles.modalInput}
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
            </div>

            {/* Submit Button */}
            <button className={styles.modalButton} type="submit">
              Submit
            </button>
          </form>

          {/* Close Button to go back */}
          <button className={styles.modalButton} onClick={() => navigate(-1)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
