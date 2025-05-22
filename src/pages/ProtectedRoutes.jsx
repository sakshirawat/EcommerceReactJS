// src/components/ProtectedRoute.js

import React from 'react';
import { useSelector } from 'react-redux'; // Used to access the Redux state
import { Navigate } from 'react-router-dom'; // Used for programmatic redirection

/**
 * ProtectedRoute is a higher-order component that restricts access to routes
 * unless a user is signed in. If not authenticated, the user is redirected
 * to the /signin page.
 */
const ProtectedRoute = ({ children }) => {
  // Access the currentUser from the Redux state
  const user = useSelector((state) => state.user.currentUser);

  // If user is not logged in, show alert and redirect to /signin
  if (!user) {
    alert("Please sign in first!"); // Optional: you can remove alerts for production
    return <Navigate to="/signin" replace />; // Replace avoids adding to browser history
  }

  // If user is authenticated, render the protected component
  return children;
};

export default ProtectedRoute;
