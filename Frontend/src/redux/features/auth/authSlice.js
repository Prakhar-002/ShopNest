

/*
?   Node modules
*/
// Importing createSlice to define a Redux slice for authentication
import { createSlice } from "@reduxjs/toolkit";


// Initial state for the auth slice
// - Tries to retrieve user info from localStorage if available
const initialState = {
      userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo')) // Convert JSON string back to object
            : null, // If not found, set to null
}


// Creating the authentication slice using createSlice
const authSlice = createSlice({

      // Name of the slice
      name: 'auth',

      // Initial state for the slice
      initialState,

      // Reducers define how the state can be updated
      reducers: {

            // Reducer to set user credentials (e.g., on login)
            setCredential: (state, action) => {

                  // Update the Redux state with the new user info
                  state.userInfo = action.payload;

                  // Store the user info in localStorage for persistence
                  localStorage.setItem('userInfo', JSON.stringify(action.payload));

                  // Optionally, store an expiration timestamp (30 days from now)
                  const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
                  localStorage.setItem('expirationTime', expirationTime);
            },

            // Reducer to clear user credentials (e.g., on logout)
            logout: (state) => {

                  // Clear user info from Redux state
                  state.userInfo = null;

                  // Clear all data from localStorage (logout cleanup)
                  localStorage.clear();
            }
      },
});


// Exporting the actions so they can be used in components
export const { setCredential, logout } = authSlice.actions;


// Exporting the reducer so it can be added to the Redux store
export default authSlice.reducer;
