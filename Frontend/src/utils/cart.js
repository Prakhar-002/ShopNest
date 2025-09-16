// Utility function to round a number to 2 decimal places
export const addDecimals = (num) => {
      // Multiply by 100, round, then divide by 100 to get 2 decimal precision
      return (Math.round(num * 100) / 100).toFixed(2);
};

// Function to update the cart values (price, shipping, tax, total)
export const updateCart = (state) => {
      // 🛒 Calculate total items price (sum of price * qty for each cart item)
      state.itemsPrice = addDecimals(
            state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      // 🚚 Calculate shipping price: Free shipping if itemsPrice > 100, else $10
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

      // 🧾 Calculate tax as 15% of the items price
      state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

      // 💰 Calculate total price = items + shipping + tax
      state.totalPrice = (
            Number(state.itemsPrice) +
            Number(state.shippingPrice) +
            Number(state.taxPrice)
      ).toFixed(2);

      // 💾 Save updated cart to localStorage to persist data across refresh
      localStorage.setItem("cart", JSON.stringify(state));

      // 🔁 Return the updated cart state
      return state;
};
