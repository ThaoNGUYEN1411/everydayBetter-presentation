import { FC } from "react";
import { useTranslation } from "react-i18next";

const HomePage: FC = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng); // Change language
  };

  return (
    <div>
      <div>HomePage</div>
      <p>crazy</p>
      <p>{t("welcome")}</p>

      {/* rome-ignore lint/a11y/useButtonType: <explanation> */}
      <button
        onClick={() => {
          changeLanguage("en");
          console.log("en");
        }}
      >
        English
      </button>
      {/* rome-ignore lint/a11y/useButtonType: <explanation> */}
      <button onClick={() => changeLanguage("fr")}>Français</button>
    </div>
  );
};

export default HomePage;
