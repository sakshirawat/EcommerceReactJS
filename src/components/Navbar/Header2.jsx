import React from 'react';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header2 = ({ onSearch }) => {
  // Get the current user, cart items, and wishlist items from Redux store
  const user = useSelector((state) => state.user.currentUser);
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  // Calculate total quantity of items in cart
  const totalCartQuantity = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  // Get total number of wishlist items
  const totalWishlistCount = wishlistItems.length;

  // Call onSearch prop callback when search input changes
  const handleInputChange = (e) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <nav className="bg-yellow-400 border-b border-gray-300 shadow-md py-4 px-8">
      {/* Container with flex layout - column on small screens, row on medium and up */}
      <div className="max-w-full mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-0">

        {/* Search bar container - takes full width on small, auto width on medium+ */}
        <div className="flex-grow w-full md:w-auto md:flex md:justify-center">
          <input
            type="text"
            placeholder="Search products..."
            onChange={handleInputChange}
            className="w-full max-w-lg px-4 py-2 rounded-md border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Icons container - full width & centered on small screens, auto width & right aligned on medium+ */}
        <div className="flex w-full md:w-auto mt-4 md:mt-0 justify-center md:justify-end gap-6 md:gap-8">
          
          {/* Wishlist icon and label */}
          <div className="relative">
            {user ? (
              <Link to="/wishlist" className="flex flex-col items-center cursor-pointer">
                <div className="relative">
                  <FaHeart size={24} />
                  {/* Display badge if wishlist count is more than 0 */}
                  {totalWishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                      {totalWishlistCount}
                    </span>
                  )}
                </div>
                <span className="mt-2 text-gray-700 text-sm text-center hover:text-blue-600 transition">
                  Wishlist
                </span>
              </Link>
            ) : (
              // Show alert on click if user is not logged in
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => alert('Please sign in first!')}
              >
                <FaHeart size={24} />
                <span className="mt-2 text-gray-700 text-sm text-center hover:text-blue-600 transition">
                  Wishlist
                </span>
              </div>
            )}
          </div>

          {/* Cart icon and label */}
          <div className="relative">
            {user ? (
              <Link to="/cart" className="flex flex-col items-center cursor-pointer">
                <div className="relative">
                  <FaShoppingCart size={24} />
                  {/* Display badge if cart quantity is more than 0 */}
                  {totalCartQuantity > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                      {totalCartQuantity}
                    </span>
                  )}
                </div>
                <span className="mt-2 text-gray-700 text-sm text-center hover:text-blue-600 transition">
                  Cart
                </span>
              </Link>
            ) : (
              // Show alert on click if user is not logged in
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => alert('Please sign in first!')}
              >
                <FaShoppingCart size={24} />
                <span className="mt-2 text-gray-700 text-sm text-center hover:text-blue-600 transition">
                  Cart
                </span>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Header2;
