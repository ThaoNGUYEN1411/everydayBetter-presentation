import { FC, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ContactPage: FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d’envoi (ex: appel API)
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  return (
    <Container className="my-5 page">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="mb-4">{t("contact.title")}</h2>

          {submitted && <Alert variant="success">{t("contact.success")}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>{t("contact.name")}</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>{t("contact.email")}</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="subject">
              <Form.Label>{t("contact.subject")}</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="message">
              <Form.Label>{t("contact.message")}</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="btn-add">
              {t("contact.send")}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
