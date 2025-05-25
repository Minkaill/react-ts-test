import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import productsData from '@shared/assetS/level3/products.json';
import { Product } from './types';
import { RootState } from '@app/store';

export const fetchProducts = createAsyncThunk<Product[], void>(
  'product/fetchProducts',
  async () => {
    return productsData as Product[];
  },
);

interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
  selectedBrands: string[];
}

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
  selectedBrands: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    toggleBrandFilter(state, action: PayloadAction<string>) {
      const brandId = action.payload;
      if (state.selectedBrands.includes(brandId)) {
        state.selectedBrands = state.selectedBrands.filter(
          (id) => id !== brandId,
        );
      } else {
        state.selectedBrands.push(brandId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.items = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load products';
      });
  },
});

export const { toggleBrandFilter } = productSlice.actions;

export const selectAllProducts = (state: RootState) => state.product.items;
export const selectProductsLoading = (state: RootState) =>
  state.product.loading;
export const selectSelectedBrands = (state: RootState) =>
  state.product.selectedBrands;
export const selectFilteredProducts = (state: RootState) => {
  const { items, selectedBrands } = state.product;
  if (selectedBrands.length === 0) {
    return items;
  }
  return items.filter((product: Product) =>
    selectedBrands.includes(String(product.brand)),
  );
};

export default productSlice.reducer;
