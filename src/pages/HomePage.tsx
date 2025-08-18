import { FC } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Testimonials from "../components/Testimonials";

const HomePage: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const inscription = () => {
    navigate("users/create");
  };

  return (
    <div>
      <section className="banner mb-5 grid wide pt-5 pb-5">
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <div className="bloc1 mt-5">
              <article className="text-banner text-center text-md-start pt-5">
                <h1 className="d-flex flex-column">{t("home.banner.title")}</h1>
                <p className="d-block w-lg-50 my-lg-5 w-sm-100">
                  {t("home.banner.subtitle")}
                </p>
                {!localStorage.getItem("nickname") && (
                  <Button
                    variant="light"
                    size="lg"
                    className="px-5 bg-green"
                    onClick={() => inscription()}
                  >
                    {t("home.banner.signup")}
                  </Button>
                )}
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

      <section className="feature-block text-center pt-5 pb-5" id="features">
        <div className="grid wide">
          <div className="text-center">
            <h2 className="feature-title pt-5">{t("home.features.title")}</h2>
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
              <Card className="px-2 pt-2">
                <Card.Img
                  variant="top"
                  src="/f1.webp"
                  className="w-80 text-center rounded shadow"
                />
                <Card.Body>
                  <Card.Title>
                    <h3 className="pb-2">{t("home.features.card3.title")}</h3>
                  </Card.Title>
                  <Card.Text className="text-align-right">
                    {t("home.features.card3.text")}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col
              xs={12}
              md={4}
              className="d-flex justify-content-center text-center mb-5"
            >
              <Card className="px-2 pt-2">
                <Card.Img
                  variant="top"
                  src="/f2.webp"
                  className="w-80 text-center rounded shadow"
                />
                <Card.Body>
                  <Card.Title>
                    <h3 className="pb-2">{t("home.features.card2.title")}</h3>
                  </Card.Title>
                  <Card.Text>{t("home.features.card2.text")}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col
              xs={12}
              md={4}
              className="d-flex justify-content-center text-center mb-5"
            >
              <Card className="px-2 pt-2">
                <Card.Img
                  variant="top"
                  src="/f4.webp"
                  className="w-80 text-center rounded shadow"
                />
                <Card.Body>
                  <Card.Title>
                    <h3 className="pb-2">{t("home.features.card1.title")}</h3>
                  </Card.Title>
                  <Card.Text>{t("home.features.card1.text")}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
      <div className="grid wide">
        <Testimonials />
      </div>
    </div>
  );
};

export default HomePage;
