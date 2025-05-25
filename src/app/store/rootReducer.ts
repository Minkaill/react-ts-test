import productReducer from '../../entities/Product/model/productSlice';
import brandReducer from '../../entities/Brand/model/brandSlice';
import cartReducer from '../../entities/Cart/model/cartSlice';

import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    product: productReducer,
    brand: brandReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
