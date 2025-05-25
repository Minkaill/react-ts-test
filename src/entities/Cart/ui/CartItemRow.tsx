import React from 'react';
import {
  Button,
  FormControl,
  Image,
  Row,
  Col,
  InputGroup,
} from 'react-bootstrap';
import { CartItem } from '../model/types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@app/store';
import { removeFromCart, updateQuantity } from '../model/cartSlice';

interface Props {
  item: CartItem;
}

export const CartItemRow: React.FC<Props> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleQtyChange = (qty: number) => {
    if (qty > 0) {
      dispatch(updateQuantity({ id: item.id, quantity: qty }));
    }
  };

  const decrement = () => handleQtyChange(item.quantity - 1);
  const increment = () => handleQtyChange(item.quantity + 1);
  const onRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <Row className="align-items-center py-3 border-bottom">
      <Col xs={4} sm={2} className="mb-2 mb-sm-0">
        <Image src={item.image} fluid rounded />
      </Col>
      <Col xs={8} sm={4} className="mb-2 mb-sm-0">
        <div className="fw-semibold">{item.title}</div>
        {item.selectedOptions && (
          <div className="text-muted small">
            {Object.entries(item.selectedOptions).map(([key, value]) => (
              <div key={key} className="d-flex">
                <span className="me-1">{key}:</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        )}
      </Col>
      <Col xs={6} sm={2} className="mb-2 mb-sm-0 text-sm-start text-end">
        <div>${item.regular_price.value.toFixed(2)}</div>
      </Col>
      <Col xs={6} sm={2} className="mb-2 mb-sm-0">
        <InputGroup size="sm">
          <Button
            variant="outline-secondary"
            onClick={decrement}
            disabled={item.quantity <= 1}
          >
            –
          </Button>
          <FormControl
            type="text"
            value={item.quantity}
            readOnly
            className="text-center"
          />
          <Button variant="outline-secondary" onClick={increment}>
            +
          </Button>
        </InputGroup>
      </Col>
      <Col xs={6} sm={1} className="mb-2 mb-sm-0 text-sm-start text-end">
        <div>${(item.regular_price.value * item.quantity).toFixed(2)}</div>
      </Col>
      <Col xs={6} sm={1} className="text-sm-start text-end">
        <Button variant="danger" size="sm" onClick={onRemove}>
          Remove
        </Button>
      </Col>
    </Row>
  );
};
