import React from "react";
import { Spinner } from "react-bootstrap";
import './Loading.scss';

export default function Loading() {
  return (
    <div className="loading" data-testid="loading" role="status" aria-live="polite">
      <Spinner animation="border" variant="primary" />
      <h5>Cargando deliciosos helados...</h5>
    </div>
  );
}