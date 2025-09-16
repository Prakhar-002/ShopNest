

/*
?   Node modules
*/
import { createSlice } from "@reduxjs/toolkit";

// 🔰 Initial state of the shop slice
const initialState = {
      categories: [],                  // 🗂️ Available product categories
      products: [],                    // 📦 All products list
      checked: [],                     // ✅ Checked category IDs for filtering
      radio: [],                       // 🎚️ Selected price range (radio input)
      brandCheckboxes: {},             // 🏷️ Brand checkbox states (brandName: boolean)
      checkedBrands: [],               // ✅ Selected brand names for filtering
};

// 🧩 Create a Redux slice for the shop
const shopSlice = createSlice({
      name: 'shop',                    // Slice name
      initialState,                    // Default state
      reducers: {

            // 🗂️ Update categories in the state
            setCategories: (state, action) => {
                  state.categories = action.payload;
            },

            // 📦 Update product list in the state
            setProducts: (state, action) => {
                  state.products = action.payload;
            },

            // ✅ Update selected categories (checkbox filters)
            setChecked: (state, action) => {
                  state.checked = action.payload;
            },

            // 💵 Update selected price range (radio filter)
            setRadio: (state, action) => {
                  state.radio = action.payload;
            },

            // 🏷️ Update selected brands (from checkboxes)
            setSelectedBrand: (state, action) => {
                  state.selectedBrand = action.payload;
            },
      }
});

// 📤 Export individual actions to use in components
export const {
      setCategories,
      setProducts,
      setChecked,
      setRadio,
      setSelectedBrand,
} = shopSlice.actions;

// 🔁 Export reducer to plug into the Redux store
export default shopSlice.reducer;
