import React, { useState } from 'react';

const Header3 = ({ onCategorySelect }) => {
  // State to toggle visibility of category list
  const [showCategories, setShowCategories] = useState(false);

  // Handle category selection and notify parent via callback
  const handleCategoryClick = (category) => {
    if (onCategorySelect) {
      onCategorySelect(category); // Send selected category to parent
    }
  };

  // Toggle category visibility on button click
  const toggleCategories = () => {
    setShowCategories((prev) => !prev);
  };

  return (
    <nav className="flex flex-col md:flex-row items-center justify-between bg-gray-800 text-white px-5 py-3 md:py-2 gap-3 md:gap-0">
      
      {/* Toggle Button for Categories */}
      <button
        onClick={toggleCategories}
        className="flex items-center space-x-2 md:mr-5 focus:outline-none"
        aria-expanded={showCategories}
        aria-controls="category-menu"
      >
        {/* Hamburger Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        {/* Button Label */}
        <h5 className="font-semibold text-sm md:text-base tracking-wide select-none">
          BROWSE CATEGORIES
        </h5>
      </button>

      {/* Conditionally Rendered Categories */}
      {showCategories && (
        <div
          id="category-menu"
          className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0"
        >
          {/* Each category button calls handler with a specific value */}
          <button
            onClick={() => handleCategoryClick('electronics')}
            className="text-sm md:text-base hover:underline focus:outline-none"
          >
            ELECTRONICS
          </button>
          <button
            onClick={() => handleCategoryClick("men's clothing")}
            className="text-sm md:text-base hover:underline focus:outline-none"
          >
            MEN CLOTHING
          </button>
          <button
            onClick={() => handleCategoryClick("women's clothing")}
            className="text-sm md:text-base hover:underline focus:outline-none"
          >
            WOMEN CLOTHING
          </button>
          <button
            onClick={() => handleCategoryClick('jewelery')}
            className="text-sm md:text-base hover:underline focus:outline-none"
          >
            JEWELRY
          </button>
        </div>
      )}

      {/* Static Promo Text */}
      <div className="mt-2 md:mt-0 md:ml-auto text-red-500 font-bold text-sm md:text-base border-t md:border-t-0 border-gray-600 pt-2 md:pt-0 text-center md:text-right w-full md:w-auto">
        CLEARANCE SALE 30%
      </div>
    </nav>
  );
};

export default Header3;
