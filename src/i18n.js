import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import trnslationAR from "./locale/ar.json";
import trnslationEN from "./locale/en.json";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: trnslationEN,
      },
      ar: {
        translation: trnslationAR,
      },
    },
    lng: "ar", // if you're using a language detector, do not define the lng option
    fallbackLng: "ar",

    interpolation: {
      escapeValue: false,
    },
  });
