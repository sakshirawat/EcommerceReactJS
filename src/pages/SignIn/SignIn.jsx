import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/userSlice';

const SignIn = () => {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for validation error messages
  const [errors, setErrors] = useState({ email: '', password: '', credentials: '' });

  const navigate = useNavigate(); // For navigation after sign-in or close
  const dispatch = useDispatch(); // To dispatch redux actions

  // Function to validate email and password inputs
  const validateInputs = () => {
    const newErrors = { email: '', password: '', credentials: '' };
    let valid = true;

    // Validate email presence and format
    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    // Validate password presence
    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors); // Update error messages in state
    return valid; // Return if form is valid or not
  };

  // Handle change in email input, also clear credentials error if present
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.credentials) setErrors(prev => ({ ...prev, credentials: '' }));
  };

  // Handle change in password input, also clear credentials error if present
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.credentials) setErrors(prev => ({ ...prev, credentials: '' }));
  };

  // Handle form submission for sign-in
  function handleSubmitSignIn(e) {
    e.preventDefault(); // Prevent page reload

    if (!validateInputs()) return; // Stop if inputs invalid

    // Get users from localStorage or use empty array if none stored
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Test users hardcoded for quick login testing
    const testUsers = [{ email: 'test@example.com', password: 'pass123', name: 'Test User' }];

    // Combine stored users and test users
    const users = [...storedUsers, ...testUsers];

    // Check if entered email & password match any user
    const loggedInUser = users.find(
      (user) => user.email === email && user.password === password
    );

    // If no match, set credentials error and return
    if (!loggedInUser) {
      setErrors(prev => ({ ...prev, credentials: 'Incorrect email or password' }));
      return;
    }

    // If matched, dispatch redux action to sign in user
    dispatch(userActions.signIn(loggedInUser));

    // Navigate to home page after successful sign-in
    navigate('/');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay to dim page behind modal */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        aria-hidden="true"
      ></div>

      {/* Modal dialog box */}
      <div className="relative z-60 bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4 sm:mx-0">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>

        <form onSubmit={handleSubmitSignIn} noValidate>
          {/* Email input field */}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-semibold">
              Email:
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              autoComplete="email"
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {/* Email validation error message */}
            {errors.email && (
              <p id="email-error" className="text-red-600 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password input field */}
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-semibold">
              Password:
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              autoComplete="current-password"
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
            {/* Password validation error message */}
            {errors.password && (
              <p id="password-error" className="text-red-600 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Incorrect credentials error message */}
          {errors.credentials && (
            <p className="text-red-600 text-center mb-4">{errors.credentials}</p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition-colors"
          >
            Submit
          </button>
        </form>

        {/* Close modal button - navigates back to home */}
        <button
          onClick={() => navigate('/', { replace: true })}
          className="mt-4 w-full py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SignIn;
