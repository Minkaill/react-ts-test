import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Product } from '../model/types';
import { AppDispatch } from '@app/store';
import { addToCart } from '@entities/Cart/model/cartSlice';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={product.image} alt={product.title} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.title}</Card.Title>
        <Card.Text className="mt-auto">
          ${product.regular_price.value.toFixed(2)}
        </Card.Text>
        <Button variant="primary" onClick={handleAddToCart}>
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
};
