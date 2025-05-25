import { AppDispatch, RootState } from '@app/store';
import {
  fetchBrands,
  selectAllBrands,
  selectBrandsLoading,
} from '@entities/Brand';
import { toggleBrandFilter, selectSelectedBrands } from '@entities/Product';

import React, { useEffect } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

export const BrandFilter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const brands = useSelector((state: RootState) => selectAllBrands(state));
  const loading = useSelector((state: RootState) => selectBrandsLoading(state));
  const selected = useSelector((state: RootState) =>
    selectSelectedBrands(state),
  );

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const onToggle = (id: string) => {
    dispatch(toggleBrandFilter(id));
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center p-3">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div>
      <h5>Brands</h5>
      <Form>
        {brands.map((brand) => (
          <Form.Check
            key={brand.id}
            type="checkbox"
            id={`brand-${brand.id}`}
            label={brand.title}
            checked={selected.includes(String(brand.id))}
            onChange={() => onToggle(String(brand.id))}
          />
        ))}
      </Form>
    </div>
  );
};
