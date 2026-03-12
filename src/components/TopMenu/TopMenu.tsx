import React from "react";
import { Link } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";
import Cart from "../Cart";

import "./TopMenu.scss";

export default function TopMenu(props: {
  productsInCart: number[];
  getProductsInCartFromLocalStorage: () => void;
  products: { data: any; loading: boolean; error: string | null };
}) {
  const { productsInCart, getProductsInCartFromLocalStorage, products } = props;
  return (
    <div className="top-menu">
      <Navbar bg="dark" variant="dark" expand="lg" className="top-menu">
        <Container>
          <BrandNav />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Cart
            productsInCart={productsInCart}
            getProductsInCartFromLocalStorage={
              getProductsInCartFromLocalStorage
            }
            products={products}
          />
        </Container>
      </Navbar>
    </div>
  );
}

function BrandNav() {
  return (
    <Navbar.Brand as={Link} to="/">
      <Logo
        className="d-inline-block align-top"
        aria-label="Helados Palacín logo"
      />
      <h2 className="d-inline-block align-top ms-2">Helados Palacín</h2>
    </Navbar.Brand>
  );
}

/* function MenuNav() {
  return (
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#helados">Helados</Nav.Link>
      <Nav.Link href="#helados-para-mascotas">Helados para mascotas</Nav.Link>
    </Nav>
  );
} */