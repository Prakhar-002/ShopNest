

/*
?   Node modules
*/

// Importing configureStore to create a Redux store
// Importing setupListeners to enable refetching of data on focus or reconnect
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";


/*
?   Custom modules
*/

// Importing the API slice we created using RTK Query
import { apiSlice } from "./api/apiSlice.js";

// Importing the authentication reducer for handling auth state
import authReducer from './features/auth/authSlice.js'
import favoritesReducer from "./features/favorites/favoriteSlice.js";
import cartSliceReducer from "./features/cart/cartSlice.js";
import shopSliceReducer from "./features/shop/shopSllice.js";
import { getFavoriteFromLocalStorage,} from "../utils/localStorage.js";


const initialFavorites = getFavoriteFromLocalStorage() || [];


// Creating the Redux store using configureStore
const store = configureStore({

      // Defining reducers to manage different slices of the app state
      reducer: {

            // Adding the reducer for RTK Query's API slice
            [apiSlice.reducerPath]: apiSlice.reducer,

            // Adding a custom reducer for authentication
            auth: authReducer,

            favorites: favoritesReducer,

            cart: cartSliceReducer,

            shop: shopSliceReducer,
      },

      preloadedState: {
            favorites: initialFavorites
      },

      // Extending the default middleware to include RTK Query's middleware
      middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(apiSlice.middleware),

      // Enabling Redux DevTools extension for debugging in development
      devTools: true,
});


// Enabling refetchOnFocus and refetchOnReconnect behaviors for all queries
setupListeners(store.dispatch);

// Exporting the store instance so it can be used in the React application
export default store;
