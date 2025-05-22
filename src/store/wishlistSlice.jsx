import { createSlice } from "@reduxjs/toolkit";

// Initial state for the wishlist slice with an empty items array
const initialState = {
  items: []
};

const wishlistSlice = createSlice({
  name: 'wishlist', // Name of the slice
  initialState: initialState, // Initial state assigned here
  reducers: {
    // Reducer to add an item to the wishlist
    addtoWishlist: (state, action) => {
      // Push the new item from action payload into the items array
      state.items.push(action.payload);
    },
    // Reducer to remove an item from the wishlist based on the item's title
    removeFromWishlist: (state, action) => {
      // Filter out the item with the matching title to remove it
      state.items = state.items.filter(item => item.title !== action.payload.title);
    }
  }
});

// Exporting the generated actions for use in dispatching
export const wishlistActions = wishlistSlice.actions;
// Exporting the reducer to be included in the store
export default wishlistSlice.reducer;
