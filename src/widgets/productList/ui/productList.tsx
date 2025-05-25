import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { ProductCard, Product as BaseProduct } from '@entities/Product';
import { ConfigurableProductCard } from '@features/ConfigurableProduct';

interface ProductListProps {
  products: Array<BaseProduct & any>;
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  if (products.length === 0) {
    return <div className="text-center mt-4">No products found.</div>;
  }

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {products.map((product) => (
        <Col key={product.id}>
          {product.type === 'configurable' ? (
            <ConfigurableProductCard product={product} />
          ) : (
            <ProductCard product={product} />
          )}
        </Col>
      ))}
    </Row>
  );
};
