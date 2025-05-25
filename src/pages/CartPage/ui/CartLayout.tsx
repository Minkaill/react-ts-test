import { RootState } from '@app/store';
import {
  selectCartItems,
  selectCartTotal,
} from '@entities/Cart/model/cartSlice';
import { CartItemRow } from '@entities/Cart/ui/CartItemRow';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export const CartPage: React.FC = () => {
  const items = useSelector((state: RootState) => selectCartItems(state));
  const total = useSelector((state: RootState) => selectCartTotal(state));

  return (
    <Container fluid className="mt-4">
      <h3>Shopping Cart</h3>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}

          <Row className="justify-content-end mt-3">
            <Col xs={4} className="text-end">
              <h5>Total: ${total.toFixed(2)}</h5>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};
