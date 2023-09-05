import { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";
import classes from "./Header.module.css";
import { useTranslation } from "react-i18next";
import PaidSharpIcon from "@mui/icons-material/PaidSharp";
import LanguageSharpIcon from "@mui/icons-material/LanguageSharp";

const Header = (props) => {
  const [t, i18n] = useTranslation();
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>{t("title")}</h1>
        <div className={classes["buttons-container"]}>
          <button
            onClick={props.onShowPayment}
            className={classes["payment-language-button"]}
          >
            <PaidSharpIcon fontSize="small"></PaidSharpIcon>{" "}
            {t("payment.title")}
          </button>
          <HeaderCartButton onClick={props.onShowCart} />

          <div>
            {i18n.language === "en" && (
              <button
                className={classes["payment-language-button"]}
                onClick={() => {
                  i18n.changeLanguage("ar");
                }}
              >
                <LanguageSharpIcon fontSize="small" /> AR
              </button>
            )}
            {i18n.language === "ar" && (
              <button
                className={classes["payment-language-button"]}
                onClick={() => {
                  i18n.changeLanguage("en");
                }}
              >
                <LanguageSharpIcon fontSize="small" /> EN
              </button>
            )}
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
