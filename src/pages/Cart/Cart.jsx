import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Cart.module.css';
import { cartActions } from '../../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const Cart = () => {
  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);
  // Local state to track currently applied coupon code
  const [couponApplied, setCouponApllied] = useState();
  // Calculate subtotal price of all items in cart
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local state for coupon code input and discounted total
  const [couponCode, setCouponCode] = useState('');
  const [discountedTotal, setDiscountedTotal] = useState(0);

  // Predefined coupon codes with their types and values
  const couponsCode = {
    FLAT50: { type: 'flat', value: 50 }, // $50 flat discount
    SAVE30: { type: 'percent', value: 0.30 }, // 30% discount
  };

  // Handle applying coupon code
  const handleCoupon = () => {
    const coupon = couponsCode[couponCode.trim().toUpperCase()];
    // Calculate total cart amount again in case it changed
    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  
    if (coupon) {
      let discountValue = 0;
  
      // Calculate discount based on coupon type
      if (coupon.type === 'flat') {
        discountValue = coupon.value;
      } else if (coupon.type === 'percent') {
        discountValue = totalAmount * coupon.value;
      }
  
      // Ensure discount doesn't exceed total amount
      if (discountValue < totalAmount) {
        const newTotal = totalAmount - discountValue;
        setDiscountedTotal(newTotal); // Update discounted total in state
        setCouponApllied(couponCode.toUpperCase()); // Save applied coupon code
        setCouponCode(''); // Clear input field
      } else {
        alert('Add more items to apply this coupon.');
      }
    } else {
      alert('Invalid coupon code');
    }
  };
  
  // Remove an item from the cart
  const handleRemove = (item) => {
    dispatch(cartActions.removeFromCart(item));
  };

  // Increase item quantity in cart by 1
  const handleIncrease = (item) => {
    dispatch(cartActions.increaseQuantity(item));
  };

  // Decrease item quantity in cart by 1 (minimum 1)
  const handleDecrease = (item) => {
    dispatch(cartActions.decreaseQuantity(item));
  };

  // Close cart overlay if clicking outside the cart container
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.overlay)) {
      navigate(-1); // Go back in history (close modal)
    }
  };

  // Total amount before discount
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Use discounted total if coupon applied, else total amount
  const finalTotal = discountedTotal > 0 ? discountedTotal : totalAmount;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.cartContainer}>
        <h2>My Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className={styles.cartContent}>
            <ul className={styles.cartList}>
              {/* Render each cart item */}
              {cartItems.map((item, index) => (
                <li key={index} className={styles.cartItem}>
                  <img src={item.image} alt={item.title} className={styles.image} />
                  <div className={styles.details}>
                    <div className={styles.titleRow}>
                      <h4 className={styles.itemTitle}>{item.title}</h4>
                      <button
                        className={styles.removeBtn}
                        onClick={() => handleRemove(item)}
                      >
                        Remove
                      </button>
                    </div>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    {/* Quantity controls */}
                    <div className={styles.quantityControl}>
                      <button onClick={() => handleDecrease(item)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleIncrease(item)}>+</button>
                    </div>
                  </div>
                </li>
              ))}

              {/* Coupon input and apply button */}
              <li className={styles.couponRow}>
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className={styles.couponInput}
                />
                <FaArrowRight
                  className={styles.couponArrow}
                  onClick={handleCoupon}
                  title="Apply Coupon"
                />
              </li>
            </ul>

            {/* Total and checkout section */}
            <div className={styles.totalColumn}>
              <h5>Cart Subtotal: ${cartSubtotal.toFixed(2)}</h5>
              {/* Show discount info if coupon applied */}
              {discountedTotal > 0 && (
                <div>
                  <p className={styles.discountedText}>
                    Discount Applied: 
                    <strong>-${(totalAmount - finalTotal).toFixed(2)}</strong>
                    <br />
                    using coupon: <strong>{couponApplied}</strong>
                  </p>
                  <p className={styles.discountedText}>
                    New Total: ${finalTotal.toFixed(2)}
                  </p>
                </div>
              )}
              <button className={styles.checkoutBtn}>Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
