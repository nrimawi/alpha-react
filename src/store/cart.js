import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { items: [], totalAmount: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItemToCart(state, action) {
      state.totalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.payload.amount,
        };
        state.items = [...state.items];
        state.items[existingCartItemIndex] = updatedItem;
      } else {
        state.items = state.items.concat(action.payload);
      }
    },
    removeItemFromCart(state, action) {
      debugger;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      const existingItem = state.items[existingCartItemIndex];

      state.totalAmount = state.totalAmount - existingItem.price;
      if (existingItem.amount === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        state.items[existingCartItemIndex] = updatedItem;
      }
    },
    clearCart(state) {
      state.totalAmount = 0;
      state.items = [];
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
