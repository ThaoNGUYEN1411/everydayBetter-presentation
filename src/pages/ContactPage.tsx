import { FC } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ContactPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Container className="my-5 page">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="mb-4">{t("contact.title")}</h2>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>{t("contact.name")}</Form.Label>
              <Form.Control type="text" name="name" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>{t("contact.email")}</Form.Label>
              <Form.Control type="email" name="email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="subject">
              <Form.Label>{t("contact.subject")}</Form.Label>
              <Form.Control type="text" name="subject" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="message">
              <Form.Label>{t("contact.message")}</Form.Label>
              <Form.Control as="textarea" rows={5} name="message" required />
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
