import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { wishlistActions } from '../../store/wishlistSlice';
import { cartActions } from '../../store/cartSlice';
import { FaTrashAlt } from 'react-icons/fa';

const Wishlist = () => {
  const navigate = useNavigate(); // React Router hook for navigation
  const dispatch = useDispatch(); // Redux hook to dispatch actions

  // Select current user from Redux store
  const user = useSelector((state) => state.user.currentUser);
  // Select wishlist items from Redux store
  const wishlistItems = useSelector((state) => state.wishlist.items);

  // If no user is logged in, do not render the wishlist
  if (!user) return null;

  // Close wishlist modal when clicking outside the content (on overlay)
  const handleOverlayClick = (e) => {
    if (e.target.id === 'overlay') {
      navigate(-1); // Navigate back to previous page
    }
  };

  // Remove an item from the wishlist by dispatching Redux action
  const handleRemove = (item) => {
    dispatch(wishlistActions.removeFromWishlist(item));
  };

  // Add item to cart and remove it from wishlist
  const handleAddToCart = (item) => {
    dispatch(cartActions.addToCart({ ...item, quantity: 1 }));
    dispatch(wishlistActions.removeFromWishlist(item));
  };

  return (
    // Overlay container with click handler to detect outside clicks
    <div
      id="overlay"
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      {/* Modal box containing wishlist items */}
      <div className="bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-2xl z-50">
        <h2 className="text-2xl font-bold mb-6 text-center">My Wishlist</h2>

        {/* Show message if wishlist is empty */}
        {wishlistItems.length === 0 ? (
          <p className="text-center text-gray-600">No items in wishlist.</p>
        ) : (
          // Map over wishlist items and render each
          wishlistItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center mb-6 bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              {/* Item image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-md mr-4"
              />

              {/* Item details and actions */}
              <div className="flex-1">
                <h4 className="text-lg font-semibold">{item.title}</h4>
                <p className="text-gray-600 mb-2">${item.price.toFixed(2)}</p>

                <div className="flex gap-4 items-center">
                  {/* Button to add item to cart */}
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Add To Cart
                  </button>

                  {/* Trash icon to remove item from wishlist */}
                  <FaTrashAlt
                    className="text-red-600 cursor-pointer hover:text-red-800 text-lg"
                    onClick={() => handleRemove(item)}
                    title="Remove"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
