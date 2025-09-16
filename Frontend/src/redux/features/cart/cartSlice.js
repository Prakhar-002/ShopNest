
/*
?   Node modules
*/
import { createSlice } from "@reduxjs/toolkit";

/*
?   Utils
*/
import { updateCart } from "../../../utils/cart";

// Load initial cart state from localStorage if it exists
const initialState = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : {
            cartItems: [],                        // 🧺 Empty cart initially
            shippingAddress: {},                  // 🏠 No shipping address yet
            paymentMethod: "PayPal",              // 💳 Default payment method
      };

// Create a cart slice using Redux Toolkit
const cartSlice = createSlice({
      name: "cart",                                // Slice name
      initialState,                                // Initial cart state
      reducers: {

            // ✅ Add or update an item in the cart
            addToCart: (state, action) => {
                  // Destructure unwanted fields (user, reviews, etc.)
                  const { user, rating, numReviews, reviews, ...item } = action.payload;

                  // Check if the item already exists in the cart
                  const existItem = state.cartItems.find((x) => x._id === item._id);

                  if (existItem) {
                        // If item exists, replace it with the new one
                        state.cartItems = state.cartItems.map((x) =>
                              x._id === existItem._id ? item : x
                        );
                  } else {
                        // If not, append the new item to the cart
                        state.cartItems = [...state.cartItems, item];
                  }

                  // Update all cart totals (price, tax, shipping, etc.)
                  return updateCart(state, item);
            },

            // ❌ Remove item from cart
            removeFromCart: (state, action) => {
                  state.cartItems = state.cartItems.filter(
                        (x) => x._id !== action.payload
                  );
                  return updateCart(state);
            },

            // 📦 Save shipping address to state and localStorage
            saveShippingAddress: (state, action) => {
                  state.shippingAddress = action.payload;
                  localStorage.setItem("cart", JSON.stringify(state));
            },

            // 💳 Save payment method to state and localStorage
            savePaymentMethod: (state, action) => {
                  state.paymentMethod = action.payload;
                  localStorage.setItem("cart", JSON.stringify(state));
            },

            // 🧹 Clear all items from cart but retain address/payment
            clearCartItems: (state, action) => {
                  state.cartItems = [];
                  localStorage.setItem("cart", JSON.stringify(state));
            },

            // 🔄 Reset entire cart back to its initial state
            resetCart: (state) => (state = initialState),
      },
});

// Export individual reducer actions for use in components
export const {
      addToCart,
      removeFromCart,
      savePaymentMethod,
      saveShippingAddress,
      clearCartItems,
      resetCart,
} = cartSlice.actions;

// Export the full reducer to use in store configuration
export default cartSlice.reducer;
