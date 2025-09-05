import React from "react";
import { Alert } from "react-bootstrap";

const ErrorMessage: React.FC = () => {
  return (
    <Alert variant="danger" className="d-flex align-items-center mt-2">
      <span className="me-2">❌</span>
      <span> "Une erreur est survenue"</span>
    </Alert>
  );
};

export default ErrorMessage;
