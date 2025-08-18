import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import enTranslation from "./en/translation.json";
import frTranslation from "./fr/translation.json";

const supportedLanguages = ["en", "fr"];
const defaultLang = "en";

//browser detection
const browserLang = navigator.language.split("-")[0]; // ex: "fr-FR" -> "fr"
const selectedLang = supportedLanguages.includes(browserLang)
  ? browserLang
  : defaultLang;

// update <html lang="">
document.documentElement.lang = selectedLang;

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
    fallbackLng: defaultLang,
    debug: true,
    interpolation: { escapeValue: false }, // react already safes from xss
  });

export default i18next;
