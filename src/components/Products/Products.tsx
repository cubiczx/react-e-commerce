import React from "react";
import { Container, Row } from "react-bootstrap";
import Loading from "../Loading";
import Error from "../Error";
import Product from "../Product/Product";
import Breadcrumbs from "../Breadcrumbs";

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

  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Todos los Helados", active: true }
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <main className="products" data-testid="products">
        <Container>
          <header className="products-header">
            <h1>Helados Palacín - Sabor Artesanal en Cada Bocado</h1>
            <p className="products-subtitle">
              Descubre nuestra selección de helados artesanales elaborados con ingredientes de primera calidad. 
              Desde clásicos sándwiches de nata hasta deliciosos cucuruchos de vainilla. 
              ¡Refresca tu día con el auténtico sabor de siempre!
            </p>
          </header>
          
          <section className="products-grid" aria-label="Catálogo de helados">
            <h2 className="visually-hidden">Nuestros Productos</h2>
            <Row>
              {
                data.map((product: any) => (
                  <Product key={product.id} product={product} addProductToCart={addProductToCart} />
                ))
              }
            </Row>
          </section>
        </Container>
      </main>
    </>
  );
}
