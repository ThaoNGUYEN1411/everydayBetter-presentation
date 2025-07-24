import { FC } from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const PrivacyPolicy: FC = () => {
  const { t } = useTranslation();

  return (
    <Container className="mt-5 mb-5 page grid wide">
      <h2 className="mb-4">{t("privacy.title")}</h2>
      <p className="text-muted">{t("privacy.lastUpdate")}</p>
      <p>{t("privacy.intro")}</p>

      <div className="mb-3">
        <h3>{t("privacy.cookies.title")}</h3>
        <p>{t("privacy.cookies.text")}</p>
      </div>

      <div className="mb-3">
        <h3>{t("privacy.data.title")}</h3>
        <p>{t("privacy.data.text")}</p>
      </div>

      <div className="mb-3">
        <h3>{t("privacy.security.title")}</h3>
        <p>{t("privacy.security.text")}</p>
      </div>

      <div className="mb-3">
        <h3>{t("privacy.contact.title")}</h3>
        <p>{t("privacy.contact.text")}</p>
      </div>
    </Container>
  );
};
export default PrivacyPolicy;
