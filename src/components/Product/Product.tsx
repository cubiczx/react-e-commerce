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
      <article className="product-card">
        <Card>
          <div className="product-image-wrapper">
            <Card.Img 
              variant="top" 
              src={`${BASE_PATH}/${product.image}`}
              alt={`${product.name} - Helados Palacín`}
              loading="lazy"
              width="300"
              height="300"
            />
          </div>
          <Card.Body>
            <Card.Title as="h3">{product.name}</Card.Title>
            <Card.Text className="product-info">{product.extraInfo}</Card.Text>
            <Card.Text className="product-price">
              <strong>{product.price.toFixed(2)} €</strong> / unidad
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => addProductToCart(product.id, product.name)}
              aria-label={`Agregar ${product.name} al carrito`}
            >
              Agregar al carrito
            </Button>
          </Card.Body>
        </Card>
      </article>
    </Col>
  );
}
