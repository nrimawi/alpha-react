import React from "react";
import classes from "./Footer.module.css";
import visa from "../../../assets/visaMsterCard.png";
import masterCard from "../../../assets/masterCard.png";
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
      <div className={classes.returningPolicy}>
        <h3>Returuning Policy</h3>
        <p>
          This Website offers services, and the payment will be decided between
          the company and service take on demand.{" "}
        </p>
      </div>

      <div className={classes.privacyPolicy}>
        <h3>
          {" "}
          <a href="/" onClick={handleDownloadClick}>
            Privacy Policy{" "}
          </a>
        </h3>
      </div>
      <div>
        <img
          className={classes.visaImage}
          src={visa}
          alt="A table full of delicious food!"
        />
        <img
          className={classes.visaImage}
          src={masterCard}
          alt="A table full of delicious food!"
        />
      </div>
    </div>
  );
};
export default Footer;
