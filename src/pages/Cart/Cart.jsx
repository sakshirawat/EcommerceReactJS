import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const Cart = () => {
  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  // Redux dispatcher to modify cart state
  const dispatch = useDispatch();

  // Hook for navigating programmatically
  const navigate = useNavigate();

  // Local state for coupon code input and whether it's applied
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApllied] = useState();
  const [discountedTotal, setDiscountedTotal] = useState(0);

  // Calculate cart subtotal
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Hardcoded coupon definitions
  const couponsCode = {
    FLAT50: { type: 'flat', value: 50 },       // Flat $50 off
    SAVE30: { type: 'percent', value: 0.3 },   // 30% off
  };

  // Handle coupon code application
  const handleCoupon = () => {
    const coupon = couponsCode[couponCode.trim().toUpperCase()];
    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    if (coupon) {
      let discountValue = 0;

      // Determine the discount amount
      if (coupon.type === 'flat') {
        discountValue = coupon.value;
      } else if (coupon.type === 'percent') {
        discountValue = totalAmount * coupon.value;
      }

      // Apply coupon only if discount is valid
      if (discountValue < totalAmount) {
        const newTotal = totalAmount - discountValue;
        setDiscountedTotal(newTotal);
        setCouponApllied(couponCode.toUpperCase());
        setCouponCode('');
      } else {
        alert('Add more items to apply this coupon.');
      }
    } else {
      alert('Invalid coupon code');
    }
  };

  // Cart item operations
  const handleRemove = (item) => {
    dispatch(cartActions.removeFromCart(item));
  };

  const handleIncrease = (item) => {
    dispatch(cartActions.increaseQuantity(item));
  };

  const handleDecrease = (item) => {
    dispatch(cartActions.decreaseQuantity(item));
  };

  // Close cart modal on overlay click
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('overlay')) {
      navigate(-1); // Go back to previous page
    }
  };

  // Determine final amount (with or without discount)
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const finalTotal = discountedTotal > 0 ? discountedTotal : totalAmount;

  return (
    <div
      className="overlay fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 backdrop-blur-sm z-50"
      onClick={handleOverlayClick}
    >
      <div className="cartContainer bg-white p-5 rounded-lg border border-gray-300 shadow-md w-[90%] max-w-4xl max-h-[90vh] overflow-auto">
        <h2 className="text-2xl font-semibold mb-4">My Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cartContent flex flex-col lg:flex-row justify-between items-start gap-6">
            {/* Cart item list */}
            <ul className="cartList flex-2 list-none p-0 w-full lg:w-2/3 overflow-auto max-h-[60vh]">
              {cartItems.map((item, index) => (
                <li key={index} className="cartItem flex items-center mb-4 last:mb-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover mr-4 rounded"
                  />
                  <div className="details flex-1">
                    <div className="titleRow flex justify-between items-center mb-1">
                      <h4 className="itemTitle text-lg font-medium m-0">
                        {item.title}
                      </h4>
                      <button
                        className="removeBtn bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded ml-4"
                        onClick={() => handleRemove(item)}
                      >
                        Remove
                      </button>
                    </div>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <div className="quantityControl flex items-center gap-3 mt-2">
                      <button
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => handleDecrease(item)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => handleIncrease(item)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}

              {/* Coupon input section */}
              <li className="couponRow flex items-center gap-3 mt-6">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="couponInput p-2 border border-gray-300 rounded w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaArrowRight
                  className="couponArrow text-xl cursor-pointer text-blue-600 hover:text-blue-700"
                  onClick={handleCoupon}
                  title="Apply Coupon"
                />
              </li>
            </ul>

            {/* Total summary section */}
            <div className="totalColumn flex-1 text-right pl-6 w-full lg:w-1/3">
              <h5 className="text-lg font-semibold">
                Cart Subtotal: ${cartSubtotal.toFixed(2)}
              </h5>

              {/* If discount is applied, show summary */}
              {discountedTotal > 0 && (
                <div className="mt-3">
                  <p className="discountedText text-red-600">
                    Discount Applied:{' '}
                    <strong>
                      -${(totalAmount - finalTotal).toFixed(2)}
                    </strong>
                    <br />
                    using coupon: <strong>{couponApplied}</strong>
                  </p>
                  <p className="discountedText text-green-700 font-semibold">
                    New Total: ${finalTotal.toFixed(2)}
                  </p>
                </div>
              )}

              <button className="checkoutBtn mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded w-full lg:w-auto">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
