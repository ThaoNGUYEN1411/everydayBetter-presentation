import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const faFacebookIcon: IconProp = faFacebook;
const faTwitterIcon: IconProp = faTwitter;
const faInstagramIcon: IconProp = faInstagram;

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="d-block mt-5 pt-4 bg-light pb-4">
      <Container>
        <Row>
          <Col lg={2} xs={12} className="mb-2 ms-2">
            <img src="/logo.png" alt={t("footer.logoAlt")} className="logo" />
          </Col>
          <Col lg={3} xs={12} className="mb-2 ms-2">
            <Link
              to={"/about"}
              className="text-decoration-none text-dark text-hover-blue"
            >
              <h3>{t("footer.about.title")}</h3>
            </Link>
          </Col>
          <Col lg={3} xs={12} className="mb-2 ms-2">
            <h3>{t("footer.social.title")}</h3>
            <span className="mt-4 d-block pe-2">
              <Link
                to={"/"}
                className="text-decoration-none text-dark text-hover-blue"
              >
                <FontAwesomeIcon
                  icon={faFacebookIcon}
                  className="me-4"
                  size="lg"
                />
              </Link>
              <Link
                to={"/"}
                className="text-decoration-none text-dark text-hover-blue"
              >
                <FontAwesomeIcon
                  icon={faTwitterIcon}
                  className="me-4"
                  size="lg"
                />
              </Link>
              <Link
                to={"/"}
                className="text-decoration-none text-dark text-hover-blue"
              >
                <FontAwesomeIcon
                  icon={faInstagramIcon}
                  className="me-4"
                  size="lg"
                />
              </Link>
            </span>
          </Col>
          <Col lg={3} xs={12} className="mb-2 ms-2">
            <h3>{t("footer.contact.title")}</h3>
            <Link
              to="/privacy-policy"
              className="text-decoration-none text-dark text-hover-blue"
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
