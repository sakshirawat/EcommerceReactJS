import React from 'react';
import Card from '../../components/UI/Card';
import { useDispatch, useSelector } from 'react-redux';
import { wishlistActions } from '../../store/wishlistSlice';
import { cartActions } from '../../store/cartSlice';
import { useNavigate } from 'react-router-dom';

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user.currentUser);
  const isLoggedIn = currentUser !== null;

  const cartItems = useSelector((state) => state.cart.items);

  // Destructure product properties from props
  const { title, price, image, description } = props;

  const isInCart = cartItems.some(item => item.title === title);

  const data = {
    title,
    image,
    price,
    description,
  };

  function handleAddToWishlist() {
    if (!isLoggedIn) {
      alert('Please login first');
      return;
    }
    dispatch(wishlistActions.addtoWishlist(data));
  }

  function handleAddToCart() {
    if (!isLoggedIn) {
      alert('Please login first');
      return;
    }
    dispatch(cartActions.addToCart(data));
  }

  function handleGoToCart() {
    navigate('/cart');
  }

  function handleProductItem() {
    navigate(`/product/${encodeURIComponent(title)}`, { state: { product: data } });
  }

  return (
    <li className="list-none">
      <Card className="flex flex-col h-full p-4">
        <header className="mb-3">
          <h3 className="text-2xl font-semibold truncate">{title}</h3>
          <div className="bg-gray-800 text-white text-xl rounded-full px-4 py-1 inline-block mt-1">
            ${price.toFixed(2)}
          </div>
        </header>

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

        <div className="flex justify-end gap-3 mt-3">
          <button
            onClick={handleAddToWishlist}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition text-base"
          >
            Add to wishlist
          </button>
          {isInCart ? (
            <button
              onClick={handleGoToCart}
              className="bg-yellow-600 text-white px-5 py-2 rounded hover:bg-yellow-700 transition text-base"
            >
              Go to Cart
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition text-base"
            >
              Add to Cart
            </button>
          )}
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
