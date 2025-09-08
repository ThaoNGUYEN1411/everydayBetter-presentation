import { Card, Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <Container className="mt-5 mb-5 px-5 grid wide page">
      <h1 className="mb-4">{t("about.title")}</h1>

      <Row className="mb-4">
        <Col>
          <h4>{t("about.section.presentation.title")}</h4>
          <p>{t("about.section.presentation.text")}</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card
            className="p-4 shadow"
            style={{ maxWidth: "500px", width: "100%" }}
          >
            <Row className="justify-content-center">
              <Col xs="auto">
                <img
                  src="/img-about.png"
                  alt="Illustration"
                  className="img-fluid"
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md={6}>
          <h4 className="mt-4">{t("about.section.mission.title")}</h4>
          <p>{t("about.section.mission.text")}</p>
          <h4 className="mt-4">{t("about.section.vision.title")}</h4>
          <p>{t("about.section.vision.text")}</p>
          <h4 className="mt-4">{t("about.section.values.title")}</h4>
          <ul>
            <li>{t("about.section.values.value1")}</li>
            <li>{t("about.section.values.value2")}</li>
            <li>{t("about.section.values.value3")}</li>
          </ul>
        </Col>
      </Row>

      <Row>
        <Col>
          <h4>{t("about.section.howItWorks.title")}</h4>
          <p>{t("about.section.howItWorks.text")}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;
