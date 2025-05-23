import React from 'react';
import Card from '../../components/UI/Card'; // Reusable Card component for styling container
import { useDispatch, useSelector } from 'react-redux'; // Redux hooks to dispatch actions and access state
import { wishlistActions } from '../../store/wishlistSlice'; // Actions for wishlist management
import { cartActions } from '../../store/cartSlice'; // Actions for cart management
import { useNavigate } from 'react-router-dom'; // Navigation hook to programmatically navigate

const ProductItem = (props) => {
  const dispatch = useDispatch(); // Initialize dispatch function to send actions
  const navigate = useNavigate(); // Initialize navigate function to redirect user

  // Get current user from Redux store to check login status
  const currentUser = useSelector((state) => state.user.currentUser);
  const isLoggedIn = currentUser !== null;

  // Destructure product properties from props
  const { title, price, image, description } = props;

  // Create a product data object to pass in actions or navigation
  const data = {
    title,
    image,
    price,
    description,
  };

  // Function to handle adding the product to wishlist
  function handleAddToWishlist() {
    if (!isLoggedIn) {
      alert('Please login first'); // Prevent action if user not logged in
      return;
    }
    dispatch(wishlistActions.addtoWishlist(data)); // Dispatch action to add product to wishlist
  }

  // Function to handle adding the product to cart
  function handleAddToCart() {
    if (!isLoggedIn) {
      alert('Please login first'); // Prevent action if user not logged in
      return;
    }
    dispatch(cartActions.addToCart(data)); // Dispatch action to add product to cart
  }

  // Navigate to the product detail page with the product data in state
  function handleProductItem() {
    navigate(`/product/${encodeURIComponent(title)}`, { state: { product: data } });
  }

  return (
    <li className="list-none">
      {/* Card component wraps the product item */}
      <Card className="flex flex-col h-full p-4">
        {/* Product title and price header */}
        <header className="mb-3">
          <h3 className="text-2xl font-semibold truncate">{title}</h3>
          <div className="bg-gray-800 text-white text-xl rounded-full px-4 py-1 inline-block mt-1">
            ${price.toFixed(2)}
          </div>
        </header>

        {/* Product image container - clicking navigates to product detail */}
        <div
          className="h-44 flex justify-center items-center mb-4 cursor-pointer"
          onClick={handleProductItem}
        >
          <img
            src={image}
            alt={title}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Action buttons for wishlist and cart */}
        <div className="flex justify-end gap-3 mt-3">
          <button
            onClick={handleAddToWishlist}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition text-base"
          >
            Add to wishlist
          </button>
          <button
            onClick={handleAddToCart}
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition text-base"
          >
            Add to Cart
          </button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
