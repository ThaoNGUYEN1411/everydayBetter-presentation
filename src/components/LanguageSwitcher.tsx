import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="d-flex mx-4">
      <Button
        onClick={() => changeLanguage("fr")}
        variant="light"
        className="me-1"
      >
        <img
          src={`../../public/france_icon.png`}
          alt="flag France"
          className="flag"
        />
      </Button>
      <Button onClick={() => changeLanguage("en")} variant="light">
        <img
          src={`../../public/english_icon.png`}
          alt="flag France"
          className="flag"
        />
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
