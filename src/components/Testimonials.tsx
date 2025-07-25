import { Card, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Testimonials: React.FC = () => {
  const { t } = useTranslation();

  const testimonials = t("testimonials.list", { returnObjects: true }) as {
    name: string;
    message: string;
    avatar: string;
  }[];

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">{t("testimonials.title")}</h1>
      <Row className="justify-content-center">
        {testimonials.map((item, index) => (
          <Col key={index} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Text>"{item.message}"</Card.Text>
                <Card.Subtitle className="text-muted text-end">
                  – {item.name}
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Testimonials;
