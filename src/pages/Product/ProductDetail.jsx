import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cartSlice';
import { wishlistActions } from '../../store/wishlistSlice';

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.user.currentUser);
  const cartItems = useSelector(state => state.cart.items);
  const isLoggedIn = currentUser !== null;

  const product = location.state?.product;
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <p>Product not found.</p>;
  }

  const isInCart = cartItems.some(item => item.title === product.title);

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert('Please login first');
      return;
    }
    dispatch(cartActions.addToCart({ ...product, quantity }));
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  const handleAddToWishlist = () => {
    if (!isLoggedIn) {
      alert('Please login first');
      return;
    }
    dispatch(wishlistActions.addtoWishlist(product));
  };

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col md:flex-row md:gap-8">
        <img
          src={product.image}
          alt={product.title}
          className="max-w-[350px] w-full object-contain rounded-lg shadow-md mx-auto md:mx-0"
        />
        <div className="flex flex-col gap-4 flex-1 text-center md:text-left mt-6 md:mt-0">
          <h2 className="text-3xl font-semibold">{product.title}</h2>
          <h3 className="text-2xl font-semibold">${product.price.toFixed(2)}</h3>

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

          <div className="flex flex-col md:flex-row gap-4 mt-4 justify-center md:justify-start">
            {isInCart ? (
              <button
                className="bg-yellow-600 hover:bg-yellow-700 transition text-white px-6 py-3 rounded-md font-bold w-full md:w-auto"
                onClick={handleGoToCart}
              >
                Go to Cart
              </button>
            ) : (
              <button
                className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-md font-bold w-full md:w-auto"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            )}
            <button
              className="bg-pink-500 hover:bg-pink-700 transition text-white px-6 py-3 rounded-md font-bold w-full md:w-auto"
              onClick={handleAddToWishlist}
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-inner">
          <h4 className="mb-4 text-xl font-semibold">Description</h4>
          <p>{product.description}</p>
        </div>

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
