import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './ProductDetail.module.css';
import { cartActions } from '../../store/cartSlice';
import { wishlistActions } from '../../store/wishlistSlice';

const ProductDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  // Get product data passed via state from navigation
  const product = location.state?.product;

  // Local state for quantity selector, default 1
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    // Handle missing product info gracefully
    return <p>Product not found.</p>;
  }

  // Handlers for quantity increment/decrement
  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // Dispatch add to cart action with product and quantity
  const handleAddToCart = () => {
    dispatch(cartActions.addToCart({ ...product, quantity }));
  };

  // Dispatch add to wishlist action
  const handleAddToWishlist = () => {
    dispatch(wishlistActions.addtoWishlist(product));
  };

  return (
    <div className={styles.productDetailContainer}>
      {/* First row: Image and product info */}
      <div className={styles.topRow}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.image}
        />
        <div className={styles.info}>
          <h2>{product.title}</h2>
          <h3>${product.price.toFixed(2)}</h3>

          {/* Quantity selector with +/- buttons and display */}
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

      {/* Second row: Description and Shipping Policy side-by-side */}
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
