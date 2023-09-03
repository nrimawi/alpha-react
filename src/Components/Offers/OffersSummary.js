import { useTranslation } from "react-i18next";
import classes from "./OffersSummary.module.css";
const OffersSummary = () => {
  const [t, i18n] = useTranslation();
  return (
    <section className={classes.summary}>
      {i18n.language === "en" && (
        <button
          className={classes.languageButton}
          onClick={() => {
            i18n.changeLanguage("ar");
          }}
        >
          AR
        </button>
      )}
      {i18n.language === "ar" && (
        <button
          className={classes.languageButton}
          onClick={() => {
            i18n.changeLanguage("en");
          }}
        >
          EN
        </button>
      )}
      <h2>{t("aboutUs.title")}</h2>
      <p>{t("aboutUs.subTitle")}</p>
    </section>
  );
};

export default OffersSummary;
