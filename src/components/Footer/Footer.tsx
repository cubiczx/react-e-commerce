import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.scss";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4} className="footer-section">
            <h3>Helados Palacín</h3>
            <p>
              Los mejores helados artesanales elaborados con ingredientes de primera calidad.
              Sabor auténtico desde 1975.
            </p>
          </Col>
          
          <Col md={4} className="footer-section">
            <h3>Enlaces Rápidos</h3>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/sobre-nosotros">Sobre Nosotros</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </Col>
          
          <Col md={4} className="footer-section">
            <h3>Contacto</h3>
            <ul className="contact-info">
              <li>📧 <a href="mailto:cubiczx@hotmail.com">cubiczx@hotmail.com</a></li>
              <li>📍 España</li>
              <li>
                💻 <a 
                  href="https://github.com/cubiczx/react-e-commerce" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        
        <Row className="footer-bottom">
          <Col>
            <p>&copy; {currentYear} Helados Palacín. Todos los derechos reservados.</p>
            <p className="made-with-love">
              Hecho con <span className="heart">❤️</span> para los amantes del helado
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
