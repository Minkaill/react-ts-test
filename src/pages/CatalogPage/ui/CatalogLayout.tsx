import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  selectFilteredProducts,
} from '../../../entities/Product/model/productSlice';
import { AppDispatch, RootState } from '../../../app/store';
import { BrandFilter } from '@widgets/brandFilter';
import { ProductList } from '@widgets/productList';

export const CatalogLayout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) =>
    selectFilteredProducts(state),
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col xs={12} md={3} lg={2} className="mb-3">
          <BrandFilter />
        </Col>
        <Col xs={12} md={9} lg={10}>
          <ProductList products={products} />
        </Col>
      </Row>
    </Container>
  );
};
