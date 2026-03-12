import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import Breadcrumbs from "../Breadcrumbs";
import "./Contact.scss";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Contacto", active: true }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <main className="contact">
        <Container>
          <header className="contact-header">
            <h1>Contacto</h1>
            <p className="subtitle">¿Tienes alguna pregunta? Estamos aquí para ayudarte</p>
          </header>

          <Row>
            <Col lg={6} className="contact-info-section">
              <div className="contact-card">
                <h2>Información de Contacto</h2>
                <p className="intro-text">
                  Nos encantaría saber de ti. Si tienes alguna pregunta sobre nuestros 
                  productos, pedidos o simplemente quieres compartir tu experiencia con 
                  nosotros, no dudes en contactarnos.
                </p>

                <div className="contact-details">
                  <div className="contact-item">
                    <div className="contact-icon">👤</div>
                    <div className="contact-text">
                      <h3>Responsable</h3>
                      <p>Xavier Palacín Ayuso</p>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">📧</div>
                    <div className="contact-text">
                      <h3>Email</h3>
                      <a href="mailto:cubiczx@hotmail.com">cubiczx@hotmail.com</a>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">💻</div>
                    <div className="contact-text">
                      <h3>GitHub</h3>
                      <a 
                        href="https://github.com/cubiczx/react-e-commerce" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        github.com/cubiczx/react-e-commerce
                      </a>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">⏰</div>
                    <div className="contact-text">
                      <h3>Horario de Atención</h3>
                      <p>Lunes a Viernes: 9:00 - 18:00</p>
                      <p>Sábados: 10:00 - 14:00</p>
                      <p>Domingos: Cerrado</p>
                    </div>
                  </div>
                </div>

                <div className="social-media">
                  <h3>Síguenos</h3>
                  <div className="social-icons">
                    <a href="https://github.com/cubiczx" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <span className="social-icon">🐙</span>
                    </a>
                    <a href="#facebook" aria-label="Facebook">
                      <span className="social-icon">📘</span>
                    </a>
                    <a href="#instagram" aria-label="Instagram">
                      <span className="social-icon">📷</span>
                    </a>
                    <a href="#twitter" aria-label="Twitter">
                      <span className="social-icon">🐦</span>
                    </a>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={6} className="contact-form-section">
              <div className="form-card">
                <h2>Envíanos un Mensaje</h2>
                
                {showSuccess && (
                  <Alert variant="success" className="success-alert">
                    <Alert.Heading>¡Mensaje enviado! 🎉</Alert.Heading>
                    <p>
                      Gracias por contactarnos. Responderemos a tu mensaje lo antes posible.
                    </p>
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Nombre *</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formSubject">
                    <Form.Label>Asunto *</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="¿En qué podemos ayudarte?"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formMessage">
                    <Form.Label>Mensaje *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Escribe tu mensaje aquí..."
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="submit-button">
                    Enviar Mensaje
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>

          <section className="faq-section">
            <h2>Preguntas Frecuentes</h2>
            <Row>
              <Col md={6} className="faq-item">
                <h3>🚚 ¿Cuál es el tiempo de entrega?</h3>
                <p>
                  Realizamos entregas de 24 a 48 horas laborables en toda España. 
                  Para zonas especiales, consulta el tiempo estimado en el checkout.
                </p>
              </Col>
              <Col md={6} className="faq-item">
                <h3>💰 ¿Qué métodos de pago aceptan?</h3>
                <p>
                  Aceptamos tarjeta de crédito/débito, PayPal, transferencia bancaria 
                  y contra reembolso (con cargo adicional).
                </p>
              </Col>
              <Col md={6} className="faq-item">
                <h3>📦 ¿Cómo se envían los helados?</h3>
                <p>
                  Todos nuestros productos se envían en cajas isotérmicas con gel 
                  refrigerante para mantener la cadena de frío durante el transporte.
                </p>
              </Col>
              <Col md={6} className="faq-item">
                <h3>🔄 ¿Puedo devolver un producto?</h3>
                <p>
                  Por la naturaleza de nuestros productos (alimentos congelados), 
                  solo aceptamos devoluciones en caso de productos defectuosos o 
                  errores en el pedido.
                </p>
              </Col>
            </Row>
          </section>
        </Container>
      </main>
    </>
  );
}
