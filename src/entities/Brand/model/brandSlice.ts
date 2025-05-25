import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import brandsData from '@shared/assets/brands.json';
import { Brand } from './types';
import { RootState } from '@app/store';

export const fetchBrands = createAsyncThunk<Brand[], void>(
  'brand/fetchBrands',
  async () => {
    return brandsData as Brand[];
  },
);

interface BrandState {
  items: Brand[];
  loading: boolean;
  error: string | null;
}

const initialState: BrandState = {
  items: [],
  loading: false,
  error: null,
};

export const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchBrands.fulfilled,
        (state, action: PayloadAction<Brand[]>) => {
          state.items = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load brands';
      });
  },
});

export const selectAllBrands = (state: RootState) => state.brand.items;
export const selectBrandsLoading = (state: RootState) => state.brand.loading;
export const selectBrandsError = (state: RootState) => state.brand.error;

export default brandSlice.reducer;
