import { createSlice } from "@reduxjs/toolkit";

// Load initial cart from localStorage
const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: initialCart,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      console.log(item)
      const existingItem = state.items.find((i) => i._id === item._id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push({ ...item, quantity: item.quantity });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
