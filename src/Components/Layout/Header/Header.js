import { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";
import classes from "./Header.module.css";
import { useTranslation } from "react-i18next";

const Header = (props) => {
  const [t, i18n] = useTranslation();
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>{t("title")}</h1>
        <div className={classes["cart-lang"]}>
          <HeaderCartButton onClick={props.onShowCart} />
          <div>
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
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
