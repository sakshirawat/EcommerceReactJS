import React from 'react';
import Card from '../../components/UI/Card';
import classes from './ProductItem.module.css';
import { useDispatch } from 'react-redux';
import { wishlistActions } from '../../store/wishlistSlice';
import { cartActions } from '../../store/cartSlice';
import { useNavigate } from 'react-router-dom';

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Destructure props for easier use
  const { title, price, image, description } = props;

  // Prepare product data object to send to Redux actions
  const data = {
    title,
    image,
    price,
    description
  };

  // Handler to add product to wishlist
  function handleAddToWishlist() {
    dispatch(wishlistActions.addtoWishlist(data));
  }

  // Handler to add product to cart
  function handleAddToCart() {
    dispatch(cartActions.addToCart(data));
  }

  // Handler to navigate to detailed product page, passing product data via state
  function handleProductItem() {
    navigate(`/product/${encodeURIComponent(title)}`, { state: { product: data } });
  }

  return (
    <ul className={classes.productsGrid}>
      <Card>
        <header>
          {/* Display product title */}
          <h3>{title}</h3>
          {/* Display price with 2 decimal places */}
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>

        {/* Product image with clickable navigation to details */}
        <div className={classes.imageContainer}>
          <img
            src={image}
            alt={title}
            className={classes.image}
            onClick={handleProductItem}
            style={{ cursor: 'pointer' }} // Add pointer cursor for better UX
          />
        </div>

        {/* Action buttons for wishlist and cart */}
        <div className={classes.actions}>
          <button onClick={handleAddToWishlist}>Add to wishlist</button>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </Card>
    </ul>
  );
};

export default ProductItem;
