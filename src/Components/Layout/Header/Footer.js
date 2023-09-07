import React from "react";
import classes from "./Footer.module.css";
import visa from "../../../assets/visaMsterCard.png";
import masterCard from "../../../assets/masterCard.png";

const Footer = () => {
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
        <h3>Privacy Policy</h3>
        <p>
          We value your privacy. This website collects minimal personal
          information solely for the purpose of providing our services. We do
          not share or sell your data to third parties. For more details, please
          refer to our full Privacy Policy.
        </p>
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
