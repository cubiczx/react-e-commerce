import React from "react";
import { Alert } from "react-bootstrap";

import './Error.scss';

interface ErrorProps {
  message?: string;
}

export default function Error({ message = "Ha ocurrido un error inesperado." }: ErrorProps) {
  return (
    <div className="error" role="alert" aria-live="assertive">
      <Alert variant="danger">
        <Alert.Heading>¡Ups! Algo salió mal</Alert.Heading>
        <p>{message}</p>
      </Alert>
    </div>
  );
}
