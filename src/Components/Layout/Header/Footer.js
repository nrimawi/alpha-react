import React from "react";
import classes from "./Footer.module.css";
import visa from "../../../assets/Visa_2021.ping.png";
import masterCard from "../../../assets/Mastercard-logo.ping.png";
import pdffile from "../../../assets/Policy.pdf";
import { useTranslation } from "react-i18next";
const Footer = () => {
  const [t] = useTranslation();
  const handleDownloadClick = (event) => {
    const pdfUrl = pdffile;
    event.preventDefault();
    const anchor = document.createElement("a");
    anchor.href = pdfUrl;
    anchor.target = "_blank";
    anchor.download = "PrivacyPolicy.pdf";

    anchor.click();
  };
  return (
    <div className={classes.footer}>
      <div className={classes.policy}>
        <p>
          {t("footer.text")}
          <a href="/" onClick={handleDownloadClick}>
            {t("footer.hyberLink")}
          </a>
          .
        </p>
      </div>
      <div className={classes.imagesContainer}>
        <img className={classes.visaImage} src={visa} alt="visa" />
        <img
          className={classes.masterImage}
          src={masterCard}
          alt="masterCard"
        />
      </div>
    </div>
  );
};
export default Footer;
