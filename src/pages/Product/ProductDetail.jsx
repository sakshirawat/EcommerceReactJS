import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';  // <-- added useSelector
import styles from './ProductDetail.module.css';
import { cartActions } from '../../store/cartSlice';
import { wishlistActions } from '../../store/wishlistSlice';

const ProductDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  // Get currentUser from Redux state to check login status
  const currentUser = useSelector(state => state.user.currentUser);
  const isLoggedIn = currentUser !== null;

  const product = location.state?.product;

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <p>Product not found.</p>;
  }

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

  const handleAddToWishlist = () => {
    if (!isLoggedIn) {
      alert('Please login first');
      return;
    }
    dispatch(wishlistActions.addtoWishlist(product));
  };

  return (
    <div className={styles.productDetailContainer}>
      <div className={styles.topRow}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.image}
        />
        <div className={styles.info}>
          <h2>{product.title}</h2>
          <h3>${product.price.toFixed(2)}</h3>

          <div className={styles.quantitySelector}>
            <button onClick={decreaseQuantity} className={styles.qtyBtn}>-</button>
            <span className={styles.qtyDisplay}>{quantity}</span>
            <button onClick={increaseQuantity} className={styles.qtyBtn}>+</button>
          </div>

          <div className={styles.actionButtons}>
            <button className={styles.buyBtn} onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className={styles.wishlistBtn} onClick={handleAddToWishlist}>
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.description}>
          <h4>Description</h4>
          <p>{product.description}</p>
        </div>
        <div className={styles.shippingPolicy}>
          <h4>Shipping Policy</h4>
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
