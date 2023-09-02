import { useTranslation } from "react-i18next";
import classes from "./OffersSummary.module.css";

const OffersSummary = () => {
  const [t, i18n] = useTranslation();
  return (
    <section className={classes.summary}>
      <h2>
        Welcome to Alpha Cleaning, where cleanliness is our passion and your
        satisfaction is our priority.
      </h2>
      <p>
        As a leading cleaning services company, we specialize in transforming
        spaces into immaculate havens. With our dedicated team and top-notch
        cleaning solutions, we deliver excellence, one clean at a time.
      </p>
      <p>{t("title")}</p>
      {i18n.language === "en" && (
        <button
          onClick={() => {
            i18n.changeLanguage("ar");
          }}
        >
          AR
        </button>
      )}
      {i18n.language === "ar" && (
        <button
          onClick={() => {
            i18n.changeLanguage("en");
          }}
        >
          EN
        </button>
      )}
    </section>
  );
};

export default OffersSummary;
