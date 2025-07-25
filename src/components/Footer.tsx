import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
//to do: add content necessary
const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="d-block mt-5 pt-4 bg-light">
      <Container>
        <Row>
          <Col>
            <img src="/logo.png" alt={t("footer.logoAlt")} className="logo" />
          </Col>
          <Col>
            <h3>{t("footer.about.title")}</h3>
          </Col>
          <Col>
            <h3>{t("footer.social.title")}</h3>
            <ul>
              <li>{t("footer.social.facebook")}</li>
              <li>{t("footer.social.twitter")}</li>
              <li>{t("footer.social.instagram")}</li>
            </ul>
          </Col>
          <Col>
            <h3>{t("footer.contact.title")}</h3>
            <Link
              to="/privacy-policy"
              className="text-decoration-none text-dark"
            >
              {t("footer.contact.privacyPolicy")}
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
