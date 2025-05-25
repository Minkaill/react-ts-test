import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Container, Nav, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '@app/store';
import { selectCartItems } from '@entities/Cart/model/cartSlice';

export const Header: React.FC = () => {
  const items = useSelector((state: RootState) => selectCartItems(state));
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Navbar bg="light" className="shadow-sm mb-4">
      <Container className="container-custom">
        <Navbar.Brand as={Link} to="/">
          <img
            src="/images/logo.png"
            alt="logo"
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link
              as={Link}
              to="/cart"
              className="d-flex align-items-center"
            >
              <img
                src="/images/cart.svg"
                alt="logo"
                width="20"
                height="50"
                className="d-inline-block align-top"
              />
              {count > 0 && (
                <Badge bg="danger" pill className="ms-1">
                  {count}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
