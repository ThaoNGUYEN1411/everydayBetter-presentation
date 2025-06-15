import { FC } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const HomePage: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const inscription = () => {
    navigate("users/create");
  };

  return (
    <div className="grid wide">
      <section className="banner mb-5">
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <div className="bloc1">
              <article className="text-banner text-center text-md-start">
                <h1 className="d-flex flex-column">{t("home.banner.title")}</h1>
                <p className="d-block w-lg-50 my-lg-5 w-sm-100">
                  {t("home.banner.subtitle")}
                </p>
                <Button
                  variant="light"
                  size="lg"
                  className="px-5 bg-green"
                  onClick={() => inscription()}
                >
                  {t("home.banner.signup")}
                </Button>
              </article>
            </div>
          </Col>
          <Col md={8}>
            <div className="bg-img">
              <img src="/bg.png" alt="Banner" className="img-fluid rounded" />
            </div>
          </Col>
        </Row>
      </section>

      <section className="feature-block text-center" id="features">
        <div className="text-center">
          <h2 className="feature-title">{t("home.features.title")}</h2>
        </div>
        <div className="d-flex justify-content-center">
          <p className="w-75 feature-sub-title">
            {t("home.features.subtitle")}
          </p>
        </div>
        <Row>
          <Col
            xs={12}
            md={4}
            className="d-flex justify-content-center text-center mb-5"
          >
            {/* <Col xs={12} md={4} className="mb-4"> */}
            <Card className="w-75">
              <Card.Img
                variant="top"
                src="/feature1.jpg"
                className="w-80 text-center"
              />
              <Card.Body>
                <Card.Title>{t("home.features.card1.title")}</Card.Title>
                <Card.Text>{t("home.features.card1.text")}</Card.Text>
              </Card.Body>
            </Card>
            {/* </Col> */}
          </Col>
          <Col
            xs={12}
            md={4}
            className="d-flex justify-content-center text-center mb-5"
          >
            <Card className="w-75">
              <Card.Img variant="top" src="/feature2.jpg" />
              <Card.Body>
                <Card.Title>{t("home.features.card2.title")}</Card.Title>
                <Card.Text>{t("home.features.card2.text")}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col
            xs={12}
            md={4}
            className="d-flex justify-content-center text-center mb-5"
          >
            <Card className="w-75">
              <Card.Img variant="top" src="/feature3.jpg" />
              <Card.Body>
                <Card.Title>{t("home.features.card3.title")}</Card.Title>
                <Card.Text>{t("home.features.card3.text")}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default HomePage;
