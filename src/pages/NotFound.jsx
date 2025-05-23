import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center p-12">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-lg mb-6 text-gray-600">The page you're looking for doesn't exist.</p>
      <Link 
        to="/" 
        className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
