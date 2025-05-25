import { CartPage } from '@pages/CartPage';
import { CatalogLayout } from '@pages/CatalogPage';
import { Navigate, Route, Routes } from 'react-router-dom';

export const RouterProvider = () => {
  return (
    <Routes>
      <Route path="/products" element={<CatalogLayout />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="*" element={<Navigate to="/products" />} />
    </Routes>
  );
};
