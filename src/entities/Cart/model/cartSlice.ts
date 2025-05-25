import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from './types';
import { Product } from '@entities/Product';
import { RootState } from '@app/store';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<
        Product & { selectedOptions?: Record<string, string> }
      >,
    ) {
      const { selectedOptions, ...prod } = action.payload;
      const existing = state.items.find(
        (item) =>
          item.id === prod.id &&
          JSON.stringify(item.selectedOptions) ===
            JSON.stringify(selectedOptions),
      );
      if (existing) {
        existing.quantity++;
      } else {
        state.items.push({
          ...prod,
          quantity: 1,
          selectedOptions,
        });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export default cartSlice.reducer;

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce(
    (sum, item) => sum + item.regular_price.value * item.quantity,
    0,
  );
