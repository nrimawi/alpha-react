import React from "react";
import classes from "./Footer.module.css";
import visa from "../../../assets/Visa_2021.ping.png";
import masterCard from "../../../assets/Mastercard-logo.ping.png";
import pdffile from "../../../assets/file.pdf";
const Footer = () => {
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
          We value your privacy, this website collects minimal personal
          information solely for the purpose of providing our services. We do
          not share or sell your data to third parties. For more details, please
          refer to our full{" "}
          <a href="/" onClick={handleDownloadClick}>
            Privacy and Returning Policy
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
