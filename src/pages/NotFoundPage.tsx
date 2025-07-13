import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="page grid wide mt-5 text-center">
      <h1>{t("notFoundPage.title")}</h1>
      <p>{t("notFoundPage.content")}</p>
    </div>
  );
};

export default NotFoundPage;
