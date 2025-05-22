import React from 'react';
import Card from '../../components/UI/Card';
import classes from './ProductItem.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { wishlistActions } from '../../store/wishlistSlice';
import { cartActions } from '../../store/cartSlice';
import { useNavigate } from 'react-router-dom';

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check if currentUser is null or not
  const currentUser = useSelector((state) => state.user.currentUser);
  const isLoggedIn = currentUser !== null;

  const { title, price, image, description } = props;

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

  function handleProductItem() {
    navigate(`/product/${encodeURIComponent(title)}`, { state: { product: data } });
  }

  return (
    <ul className={classes.productsGrid}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>

        <div className={classes.imageContainer}>
          <img
            src={image}
            alt={title}
            className={classes.image}
            onClick={handleProductItem}
            style={{ cursor: 'pointer' }}
          />
        </div>

        <div className={classes.actions}>
          <button onClick={handleAddToWishlist}>Add to wishlist</button>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </Card>
    </ul>
  );
};

export default ProductItem;
