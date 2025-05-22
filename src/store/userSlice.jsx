import { createSlice } from "@reduxjs/toolkit";

// Initial state for the user slice:
// currentUser starts as null, meaning no user is logged in initially
const initialState = {
  currentUser: null,
};

// Create a slice of Redux store specifically for user-related state and actions
const userSlice = createSlice({
  name: "user", // The name of this slice (used in Redux DevTools and action types)
  initialState, // The initial state defined above
  reducers: {
    // Action to sign in a user
    // Sets currentUser to the full user object provided in action.payload
    signIn: (state, action) => {
      state.currentUser = action.payload;
    },

    // Action to log out a user
    // Sets currentUser back to null
    logOut: (state) => {
      state.currentUser = null;
    },

    // Action to update user details
    // Merges the current user object with the new values from action.payload
    updateUser: (state, action) => {
      if (state.currentUser) {
        // Only update if a user is already signed in
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
  },
});

// Export the action creators (signIn, logOut, updateUser) to be used in components
export const userActions = userSlice.actions;

// Export the reducer function to be used in the Redux store
export default userSlice.reducer;
