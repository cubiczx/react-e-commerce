import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Breadcrumbs from "../Breadcrumbs";
import "./AboutUs.scss";

export default function AboutUs() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Sobre Nosotros", active: true }
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <main className="about-us">
        <Container>
          <header className="about-us-header">
            <h1>Sobre Helados Palacín</h1>
            <p className="subtitle">Más de 50 años creando momentos dulces</p>
          </header>

          <section className="our-story">
            <Row className="align-items-center">
              <Col md={6}>
                <div className="story-content">
                  <h2>Nuestra Historia</h2>
                  <p>
                    Desde 1975, Helados Palacín ha sido sinónimo de calidad y tradición en el mundo 
                    de los helados artesanales. Todo comenzó con una pequeña heladería familiar en el 
                    corazón de España, donde Xavier Palacín, nuestro fundador, decidió dedicar su vida 
                    a crear los mejores helados con recetas transmitidas de generación en generación.
                  </p>
                  <p>
                    Hoy, más de cinco décadas después, seguimos manteniendo ese compromiso con la 
                    excelencia, combinando métodos tradicionales con las mejores innovaciones para 
                    ofrecerte helados que deleitan todos los sentidos.
                  </p>
                </div>
              </Col>
              <Col md={6}>
                <div className="story-image">
                  <div className="image-placeholder">
                    <span className="ice-cream-emoji">🍦</span>
                    <p>50+ años de tradición</p>
                  </div>
                </div>
              </Col>
            </Row>
          </section>

          <section className="our-values">
            <h2>Nuestros Valores</h2>
            <Row>
              <Col md={4} className="value-card">
                <div className="value-icon">🌟</div>
                <h3>Calidad Premium</h3>
                <p>
                  Utilizamos únicamente ingredientes de primera calidad, 
                  seleccionados cuidadosamente para garantizar el mejor sabor 
                  en cada bocado.
                </p>
              </Col>
              <Col md={4} className="value-card">
                <div className="value-icon">❤️</div>
                <h3>Pasión Artesanal</h3>
                <p>
                  Cada helado es elaborado con dedicación y amor, siguiendo 
                  recetas tradicionales que han pasado de generación en 
                  generación en nuestra familia.
                </p>
              </Col>
              <Col md={4} className="value-card">
                <div className="value-icon">🌱</div>
                <h3>Sostenibilidad</h3>
                <p>
                  Nos comprometemos con el medio ambiente, utilizando 
                  envases reciclables y apoyando a productores locales 
                  siempre que sea posible.
                </p>
              </Col>
            </Row>
          </section>

          <section className="our-process">
            <h2>Nuestro Proceso</h2>
            <Row>
              <Col md={3} sm={6} className="process-step">
                <div className="step-number">1</div>
                <h4>Selección</h4>
                <p>Elegimos los mejores ingredientes del mercado</p>
              </Col>
              <Col md={3} sm={6} className="process-step">
                <div className="step-number">2</div>
                <h4>Preparación</h4>
                <p>Mezclamos con recetas tradicionales probadas</p>
              </Col>
              <Col md={3} sm={6} className="process-step">
                <div className="step-number">3</div>
                <h4>Congelación</h4>
                <p>Proceso artesanal a temperatura perfecta</p>
              </Col>
              <Col md={3} sm={6} className="process-step">
                <div className="step-number">4</div>
                <h4>Distribución</h4>
                <p>Entrega rápida para mantener la frescura</p>
              </Col>
            </Row>
          </section>

          <section className="our-commitment">
            <div className="commitment-box">
              <h2>Nuestro Compromiso Contigo</h2>
              <p>
                En Helados Palacín, no solo vendemos helados, creamos experiencias. 
                Cada producto que sale de nuestra cocina lleva consigo nuestro 
                compromiso de calidad, sabor y satisfacción. Creemos que un buen 
                helado puede alegrar cualquier día y crear recuerdos inolvidables.
              </p>
              <p>
                Gracias por confiar en nosotros y permitirnos ser parte de tus 
                momentos especiales. ¡Seguiremos trabajando para sorprenderte con 
                nuevos sabores y productos que superen tus expectativas!
              </p>
              <div className="signature">
                <p className="signature-name">Xavier Palacín Ayuso</p>
                <p className="signature-title">Fundador & Director</p>
              </div>
            </div>
          </section>
        </Container>
      </main>
    </>
  );
}
