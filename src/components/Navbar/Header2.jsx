import React from 'react';
import { FaShoppingCart, FaHeart } from 'react-icons/fa'; // Import cart and heart icons
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header2 = ({ onSearch }) => {
  const user = useSelector((state) => state.user.currentUser); // Get the current user from Redux

  // Handle search input change and pass the value up to the parent component
  const handleInputChange = (e) => {
    if (onSearch) {
      onSearch(e.target.value); // Call parent's onSearch with the search term
    }
  };

  return (
    <nav className="bg-yellow-400 border-b border-gray-300 shadow-md py-4 px-8">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        
        {/* Search bar section */}
        <div className="flex-grow w-full md:w-auto md:flex md:justify-center">
          <input
            type="text"
            placeholder="Search products..."
            onChange={handleInputChange}
            className="w-full max-w-lg px-4 py-2 rounded-md border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Wishlist and Cart icons (Right Section) */}
        <div className="flex items-center gap-8 md:gap-12">
          
          {/* Wishlist: link if logged in, else alert */}
          {user ? (
            <Link to="/wishlist" className="flex flex-col items-center cursor-pointer">
              <FaHeart size={24} />
              <span className="mt-2 text-gray-700 text-sm text-center hover:text-blue-600 transition">
                Wishlist
              </span>
            </Link>
          ) : (
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => alert('Please sign in first!')} // Alert for guests
            >
              <FaHeart size={24} />
              <span className="mt-2 text-gray-700 text-sm text-center hover:text-blue-600 transition">
                Wishlist
              </span>
            </div>
          )}

          {/* Cart: link if logged in, else alert */}
          {user ? (
            <Link to="/cart" className="flex flex-col items-center cursor-pointer">
              <FaShoppingCart size={24} />
              <span className="mt-2 text-gray-700 text-sm text-center hover:text-blue-600 transition">
                Cart
              </span>
            </Link>
          ) : (
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => alert('Please sign in first!')} // Alert for guests
            >
              <FaShoppingCart size={24} />
              <span className="mt-2 text-gray-700 text-sm text-center hover:text-blue-600 transition">
                Cart
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header2;
