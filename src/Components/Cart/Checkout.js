import { useState } from "react";

import classes from "./Checkout.module.css";
import { useTranslation } from "react-i18next";
import { MenuItem, TextField } from "@mui/material";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import i18next from "i18next";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});
const isEmpty = (value) =>
  value !== undefined ? value.trim().length < 2 : true;
const isZero = (value) => value === 0;
const isPhone = (value) => value.length === 10;
const Checkout = (props) => {
  // props.formMode =>//1-Order 2-payment
  const [t] = useTranslation();

  const [formInputsValidity, setFormInputsValidity] = useState({
    firstname: true,
    lastname: true,
    phone: true,
    email: true,
    city: true,
    address: true,
    amount: true,
    currency: true,
  });

  const [firstnameInputValue, setFirstnameInputValue] = useState();
  const [lastnameInputValue, setLastnameInputValue] = useState();
  const [phoneInputValue, setPhoneInputValue] = useState();
  const [emailInputValue, setEmailInputValue] = useState();
  const [cityInputValue, setCityInputValue] = useState();
  const [addressInputValue, setAddressInputValue] = useState();
  const [amountInputValue, setAmountInputValue] = useState(0);
  const [currencyInputValue, setCurrencyInputValue] = useState("ILS");

  const confirmHandler = (event) => {
    event.preventDefault();
    debugger;

    const enteredFirstnameIsValid = !isEmpty(firstnameInputValue);
    const enteredLastsnameIsValid = !isEmpty(lastnameInputValue);
    const enteredPhoneIsValid = !isEmpty(phoneInputValue) && isPhone;
    const enteredEmailIsValid =
      !isEmpty(emailInputValue) || props.formMode === "1";
    const enteredCityIsValid =
      !isEmpty(cityInputValue) || props.formMode === "2";
    const enteredAddressIsValid =
      !isEmpty(addressInputValue) || props.formMode === "2";
    const enteredAmountIsValid =
      !isZero(amountInputValue) || props.formMode === "1";

    setFormInputsValidity({
      firstname: enteredFirstnameIsValid,
      lastname: enteredLastsnameIsValid,
      phone: enteredPhoneIsValid,
      email: enteredEmailIsValid,
      city: enteredCityIsValid,
      address: enteredAddressIsValid,
      amount: enteredAmountIsValid,
    });

    const formIsValid =
      enteredFirstnameIsValid &&
      enteredLastsnameIsValid &&
      enteredPhoneIsValid &&
      enteredCityIsValid &&
      enteredEmailIsValid &&
      enteredAddressIsValid &&
      enteredAmountIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      firstname: firstnameInputValue,
      lastname: lastnameInputValue,
      phone: phoneInputValue,
      email: emailInputValue,
      city: cityInputValue,
      address: addressInputValue,
      amount: amountInputValue,
      currency: currencyInputValue,
    });
  };

  const currencies = [
    {
      value: "ILS",
      label: "ILS",
    },
    {
      value: "JOD ",
      label: "JOD",
    },
    {
      value: "USD",
      label: "USD",
    },
  ];

  const isArabic = i18next.language === "ar";
  const form = (
    <form className={classes.form} onSubmit={confirmHandler}>
      <TextField
        sx={{ margin: 1, minWidth: 400 }}
        error={!formInputsValidity.firstname}
        id="outlined-controlled"
        label={t("checkoutForm.firstname")}
        helperText={
          !formInputsValidity.firstname
            ? t("checkoutForm.errorMessages.firstname")
            : ""
        }
        onChange={(event) => {
          setFirstnameInputValue(event.target.value);
          formInputsValidity.firstname = true;
        }}
        value={firstnameInputValue}
      />
      <TextField
        sx={{ margin: 1, minWidth: 400 }}
        error={!formInputsValidity.lastname}
        id="outlined-controlled"
        label={t("checkoutForm.lastname")}
        helperText={
          !formInputsValidity.lastname
            ? t("checkoutForm.errorMessages.lastname")
            : ""
        }
        onChange={(event) => {
          setLastnameInputValue(event.target.value);
          formInputsValidity.lastname = true;
        }}
        value={lastnameInputValue}
      />
      {props.formMode === "2" && (
        <TextField
          sx={{ margin: 1, minWidth: 400 }}
          error={!formInputsValidity.email}
          id="outlined-controlled"
          label={t("checkoutForm.email")}
          helperText={
            !formInputsValidity.email
              ? t("checkoutForm.errorMessages.email")
              : ""
          }
          type="email"
          onChange={(event) => {
            setEmailInputValue(event.target.value);
            formInputsValidity.email = true;
          }}
          value={emailInputValue}
        />
      )}
      <TextField
        sx={{ margin: 1, minWidth: 400 }}
        error={!formInputsValidity.phone}
        id="outlined-controlled"
        label={t("checkoutForm.phone")}
        helperText={
          !formInputsValidity.phone ? t("checkoutForm.errorMessages.phone") : ""
        }
        onChange={(event) => {
          setPhoneInputValue(event.target.value);
          formInputsValidity.phone = true;
        }}
        value={phoneInputValue}
      />
      {props.formMode === "1" && (
        <TextField
          sx={{ margin: 1, minWidth: 400 }}
          error={!formInputsValidity.city}
          id="outlined-controlled"
          label={t("checkoutForm.city")}
          helperText={
            !formInputsValidity.city ? t("checkoutForm.errorMessages.city") : ""
          }
          onChange={(event) => {
            setCityInputValue(event.target.value);
            formInputsValidity.city = true;
          }}
          value={cityInputValue}
        />
      )}

      {props.formMode === "1" && (
        <TextField
          sx={{ margin: 1, minWidth: 400 }}
          error={!formInputsValidity.address}
          id="outlined-controlled"
          label={t("checkoutForm.address")}
          helperText={
            !formInputsValidity.address
              ? t("checkoutForm.errorMessages.address")
              : ""
          }
          onChange={(event) => {
            setAddressInputValue(event.target.value);
            formInputsValidity.address = true;
          }}
          value={addressInputValue}
        />
      )}
      {props.formMode === "2" && (
        <TextField
          sx={{ margin: 1, minWidth: 400 }}
          id="outlined-select-currency"
          select
          label={t("checkoutForm.currency")}
          defaultValue="ILS"
          onChange={(event) => setCurrencyInputValue(event.target.value)}
          value={currencyInputValue}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
      {props.formMode === "2" && (
        <TextField
          sx={{ margin: 1, minWidth: 400 }}
          error={!formInputsValidity.amount}
          id="outlined-controlled"
          label={t("checkoutForm.amount")}
          helperText={
            !formInputsValidity.amount
              ? t("checkoutForm.errorMessages.amount")
              : ""
          }
          type="number"
          onChange={(event) => {
            formInputsValidity.amount = true;
            setAmountInputValue(
              event.target.value !== "" ? event.target.value : "0"
            );
          }}
          value={amountInputValue}
        />
      )}
      <div className={classes.actions}>
        <button className={classes.submit}>{t("cart.confirm")}</button>

        <button type="button" onClick={props.onCancel}>
          {t("cart.cancel")}
        </button>
      </div>
    </form>
  );

  return (
    <div dir={isArabic ? "rtl" : "ltr"}>
      {isArabic && <CacheProvider value={cacheRtl}>{form}</CacheProvider>}
      {!isArabic && form}
    </div>
  );
};

export default Checkout;
