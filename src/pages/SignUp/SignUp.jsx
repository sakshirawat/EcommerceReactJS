import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  // State to hold form input values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State to hold error messages for each input field
  const [errors, setErrors] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const navigate = useNavigate(); // React Router hook for navigation

  // Function to validate the form inputs before submission
  const validateForm = () => {
    let valid = true; // Flag to track overall form validity
    const newErrors = { name: '', email: '', password: '', confirmPassword: '' };

    // Name validation - required and trimmed
    if (!name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    // Email validation - required and must match email pattern
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    // Password validation - required and minimum length
    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    // Confirm password validation - required and must match password
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    // Update the error state with validation messages
    setErrors(newErrors);
    return valid;
  };

  // Handler for form submission
  const handleSubmitSignUp = (e) => {
    e.preventDefault(); // Prevent default form submit behavior (page reload)

    // Validate form and return early if invalid
    if (!validateForm()) return;

    // Create a new user object from form inputs
    const newUser = { name, email, password };

    let users = [];

    // Attempt to retrieve existing users from localStorage
    try {
      const stored = JSON.parse(localStorage.getItem('users'));
      if (Array.isArray(stored)) users = stored;
    } catch {
      // If parsing fails, ignore and continue with empty array
    }

    // Add the new user to the users array
    users.push(newUser);

    // Store updated users array back in localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Redirect user to the sign-in page after successful sign-up
    navigate('/signin');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay to dim content behind modal */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      {/* Modal container */}
      <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 z-50">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        <form onSubmit={handleSubmitSignUp}>
          {/* Name input */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Name:</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            {/* Name validation error */}
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email input */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            {/* Email validation error */}
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password input */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            {/* Password validation error */}
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password input */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Confirm Password:</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            {/* Confirm password validation error */}
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
          >
            Submit
          </button>
        </form>

        {/* Close button to navigate back */}
        <button
          onClick={() => navigate(-1)}
          className="w-full mt-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SignUp;
