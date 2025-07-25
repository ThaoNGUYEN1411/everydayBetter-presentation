import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
//import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import enTranslation from "./en/translation.json";
import frTranslation from "./fr/translation.json";

i18next
  //.use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      fr: {
        translation: frTranslation,
      },
    },
    fallbackLng: "fr", // Default language
    debug: true,
    interpolation: { escapeValue: false }, // react already safes from xss
  });

export default i18next;
