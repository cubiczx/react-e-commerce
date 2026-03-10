import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import { BASE_PATH } from "../../utils/contants";

import "./Product.scss";

export default function Product(props: {
  product: {
    image: string;
    name: string;
    extraInfo: string;
    price: number;
    id: number;
  };
  addProductToCart: (id: number, name: string) => void;
}) {
  const { product, addProductToCart } = props;

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="product mb-4">
      <Card>
        <Card.Img variant="top" src={`${BASE_PATH}/${product.image}`} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.extraInfo}</Card.Text>
          <Card.Text>{product.price.toFixed(2)} € / unidad</Card.Text>
          <Button
            variant="primary"
            onClick={() => addProductToCart(product.id, product.name)}
          >
            Agregar al carrito
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
