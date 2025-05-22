import { createSlice } from '@reduxjs/toolkit';

// Initial state of the cart with an empty items array
const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',  // Name of the slice
  initialState,  // Initial state assigned here
  reducers: {
    // Adds an item to the cart
    addToCart(state, action) {
      const item = action.payload;

      // Check if the item already exists in the cart by matching title
      const existingItem = state.items.find((i) => i.title === item.title);

      if (existingItem) {
        // If item exists, increase quantity by the quantity in payload (or default 1)
        existingItem.quantity += item.quantity;
      } else {
        // If item does not exist, add it to the cart with provided quantity or default 1
        state.items.push({ ...item, quantity: item.quantity || 1 });
      }
    },

    // Removes an item completely from the cart by filtering it out
    removeFromCart(state, action) {
      const item = action.payload;
      state.items = state.items.filter((i) => i.title !== item.title);
    },

    // Increase the quantity of a specific item by 1
    increaseQuantity(state, action) {
      const item = state.items.find((item) => item.title === action.payload.title);
      if (item) {
        item.quantity++;
      }
    },

    // Decrease the quantity of a specific item by 1 (minimum quantity is 1)
    decreaseQuantity(state, action) {
      const item = state.items.find((item) => item.title === action.payload.title);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
  },
});

// Export actions to be used in components for dispatching
export const cartActions = cartSlice.actions;

// Export reducer to be included in the store
export default cartSlice.reducer;
