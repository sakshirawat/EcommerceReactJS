import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Hook to access the current location object
import { useDispatch, useSelector } from 'react-redux'; // Hooks to access Redux store
import { cartActions } from '../../store/cartSlice'; // Cart actions for Redux
import { wishlistActions } from '../../store/wishlistSlice'; // Wishlist actions for Redux

const ProductDetail = () => {
  const location = useLocation(); // Get the current route's state
  const dispatch = useDispatch(); // Get dispatch function to send actions to the Redux store

  const currentUser = useSelector(state => state.user.currentUser); // Get current user from the Redux state
  const isLoggedIn = currentUser !== null; // Determine if a user is logged in

  const product = location.state?.product; // Get the product data from navigation state

  const [quantity, setQuantity] = useState(1); // Local state for product quantity

  // If no product is passed via navigation state, show fallback
  if (!product) {
    return <p>Product not found.</p>;
  }

  // Decrease quantity but not below 1
  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  // Increase quantity
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  // Handle adding product to cart
  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert('Please login first');
      return;
    }
    dispatch(cartActions.addToCart({ ...product, quantity })); // Dispatch with product and quantity
  };

  // Handle adding product to wishlist
  const handleAddToWishlist = () => {
    if (!isLoggedIn) {
      alert('Please login first');
      return;
    }
    dispatch(wishlistActions.addtoWishlist(product)); // Dispatch product to wishlist
  };

  return (
    <div className="flex flex-col gap-8 p-8">
      {/* Top row - Product image and main info */}
      <div className="flex flex-col md:flex-row md:gap-8">
        <img
          src={product.image}
          alt={product.title}
          className="max-w-[350px] w-full object-contain rounded-lg shadow-md mx-auto md:mx-0"
        />
        <div className="flex flex-col gap-4 flex-1 text-center md:text-left mt-6 md:mt-0">
          <h2 className="text-3xl font-semibold">{product.title}</h2>
          <h3 className="text-2xl font-semibold">${product.price.toFixed(2)}</h3>

          {/* Quantity controls */}
          <div className="flex items-center justify-center md:justify-start gap-4 my-4">
            <button
              onClick={decreaseQuantity}
              className="bg-blue-600 hover:bg-blue-700 transition text-white w-9 h-9 rounded-md text-xl select-none flex items-center justify-center"
            >
              -
            </button>
            <span className="min-w-[32px] text-xl font-bold select-none text-center">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="bg-blue-600 hover:bg-blue-700 transition text-white w-9 h-9 rounded-md text-xl select-none flex items-center justify-center"
            >
              +
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col md:flex-row gap-4 mt-4 justify-center md:justify-start">
            <button
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-md font-bold w-full md:w-auto"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              className="bg-pink-500 hover:bg-pink-700 transition text-white px-6 py-3 rounded-md font-bold w-full md:w-auto"
              onClick={handleAddToWishlist}
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Bottom row - Description and shipping policy */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* Product description */}
        <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-inner">
          <h4 className="mb-4 text-xl font-semibold">Description</h4>
          <p>{product.description}</p>
        </div>

        {/* Shipping policy */}
        <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-inner">
          <h4 className="mb-4 text-xl font-semibold">Shipping Policy</h4>
          <p>
            We offer free standard shipping on all orders over $50.  
            Orders are processed within 1-2 business days and typically delivered within 5-7 business days.  
            Expedited shipping options available at checkout.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
