import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItemToCart(state, action) {
      state.items = state.items.concat(action.payload);
    },
    removeItemFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
