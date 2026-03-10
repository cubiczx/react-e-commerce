import React from "react";
import { Container, Row } from "react-bootstrap";
import Loading from "../Loading";
import Error from "../Error";
import Product from "../Product/Product";

import "./Products.scss";

export default function Products(props: { products: any, addProductToCart: (id: number, name: string) => void }) {
  const {
    products: { data, error, loading },
    addProductToCart
  } = props;

  if (loading || !data) {
    return <Loading />;
  }

  if (error) {
    return <Error message="Error al cargar los productos" />;
  }

  return (
    <div className="products" data-testid="products">
      <Container>
        <Row>
          {
            data.map((product: any) => (
              <Product key={product.id} product={product} addProductToCart={addProductToCart} />
            ))
          }
        </Row>
      </Container>
    </div>
  );
}
