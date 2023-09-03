import { useRef, useState } from "react";

import classes from "./Checkout.module.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;
const Checkout = (props) => {
  const [t] = useTranslation();
  const items = useSelector((state) => state.cart.items);
  const cartIsEmpty = items.length === 0;
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  return (
    !cartIsEmpty && (
      <form className={classes.form} onSubmit={confirmHandler}>
        <div className={nameControlClasses}>
          <label htmlFor="name">{t("checkoutForm.name")}</label>
          <input type="text" id="name" ref={nameInputRef} />
          {!formInputsValidity.name && <p>Please enter a valid name!</p>}
        </div>
        <div className={streetControlClasses}>
          <label htmlFor="street">{t("checkoutForm.city")}</label>
          <input type="text" id="street" ref={streetInputRef} />
          {!formInputsValidity.street && <p>Please enter a valid street!</p>}
        </div>
        <div className={postalCodeControlClasses}>
          <label htmlFor="postal">{t("checkoutForm.phone")}</label>
          <input type="text" id="postal" ref={postalCodeInputRef} />
          {!formInputsValidity.postalCode && (
            <p>Please enter a valid postal code (5 characters long)!</p>
          )}
        </div>
        <div className={cityControlClasses}>
          <label htmlFor="city">{t("checkoutForm.address")}</label>
          <input type="text" id="city" ref={cityInputRef} />
          {!formInputsValidity.city && <p>Please enter a valid city!</p>}
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={props.onCancel}>
            {t("cart.cancel")}
          </button>
          <button className={classes.submit}>{t("cart.confirm")}</button>
        </div>
      </form>
    )
  );
};

export default Checkout;
