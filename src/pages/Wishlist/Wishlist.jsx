import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Wishlist.module.css';
import { useNavigate } from 'react-router-dom';
import { wishlistActions } from '../../store/wishlistSlice';
import { cartActions } from '../../store/cartSlice';
import { FaTrashAlt } from 'react-icons/fa';

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get current logged-in user from redux state
  const user = useSelector((state) => state.user.currentUser);

  // Get wishlist items from redux state
  const wishlistItems = useSelector((state) => state.wishlist.items);

  // If no user, do not render wishlist
  if (!user) return null;

  // Close wishlist overlay if user clicks outside wishlist block
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.overlay)) {
      navigate(-1);
    }
  };

  // Remove item from wishlist
  const handleRemove = (item) => {
    dispatch(wishlistActions.removeFromWishlist(item));
  };

  // Add item to cart and remove from wishlist simultaneously
  const handleAddToCart = (item) => {
    dispatch(cartActions.addToCart({ ...item, quantity: 1 })); // add 1 by default
    dispatch(wishlistActions.removeFromWishlist(item));
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.wishlistBlock}>
        <h2>My Wishlist</h2>

        {/* Show message if wishlist empty */}
        {wishlistItems.length === 0 ? (
          <p>No items in wishlist.</p>
        ) : (
          // Render each wishlist item
          wishlistItems.map((item, index) => (
            <div className={styles.item} key={index}>
              <img src={item.image} alt={item.title} className={styles.image} />

              <div className={styles.itemInfo}>
                <h4>{item.title}</h4>
                <p>${item.price.toFixed(2)}</p>

                {/* Button to add item to cart and remove from wishlist */}
                <button onClick={() => handleAddToCart(item)}>Add To Cart</button>

                {/* Trash icon to remove from wishlist */}
                <FaTrashAlt
                  className={styles.deleteIcon}
                  onClick={() => handleRemove(item)}
                  title="Remove"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
