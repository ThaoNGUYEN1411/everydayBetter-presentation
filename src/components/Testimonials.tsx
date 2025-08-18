import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@mui/material";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Testimonials: React.FC = () => {
  const { t } = useTranslation();

  const testimonials = t("testimonials.list", { returnObjects: true }) as {
    name: string;
    message: string;
    avatar: string;
    numberStar: number;
  }[];

  return (
    <Container className="my-5 border-radu">
      <h1 className="text-center mb-4">{t("testimonials.title")}</h1>
      <Row className="justify-content-center">
        {testimonials.map((item, index) => (
          <Col key={index} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Row>
                  <Col xs={3}>
                    <Avatar
                      alt={`${item.message}`}
                      src={`/avatar/${item.avatar}.jpg`}
                      className="ms-2"
                    />
                    <p className="mt-2 ps-2">{item.name}</p>
                  </Col>
                  <Col xs={9}>
                    <Card.Text>"{item.message}"</Card.Text>
                  </Col>
                </Row>
                <span key={index}>
                  <FontAwesomeIcon icon={faStar} color="orange" />
                  <FontAwesomeIcon icon={faStar} color="orange" />
                  <FontAwesomeIcon icon={faStar} color="orange" />
                  <FontAwesomeIcon icon={faStar} color="orange" />
                </span>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Testimonials;
