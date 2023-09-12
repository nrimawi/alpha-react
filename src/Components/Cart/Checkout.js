import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import classes from "./Checkout.module.css";
import { useTranslation } from "react-i18next";
import { Grid, MenuItem, TextField } from "@mui/material";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import i18next from "i18next";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});
const regexAmount = /^[1-9]\d*$/;

const isEmpty = (value) =>
  value !== undefined ? value.trim().length < 2 : true;
const Checkout = (props) => {
  const [capatchValid, setCapatchValid] = useState(false);
  const capatchHandler = () => {
    debugger;
    setCapatchValid(true);
  };

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
  const [amountInputValue, setAmountInputValue] = useState();
  const [currencyInputValue, setCurrencyInputValue] = useState("ILS");

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredFirstnameIsValid = !isEmpty(firstnameInputValue);
    const enteredLastsnameIsValid = !isEmpty(lastnameInputValue);
    const enteredPhoneIsValid =
      !isEmpty(phoneInputValue) && phoneInputValue.length === 10;
    const enteredEmailIsValid =
      !isEmpty(emailInputValue) || props.formMode === "1";
    const enteredCityIsValid =
      !isEmpty(cityInputValue) || props.formMode === "2";
    const enteredAddressIsValid =
      !isEmpty(addressInputValue) || props.formMode === "2";
    const enteredAmountIsValid =
      regexAmount.test(amountInputValue) || props.formMode === "1";

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

    if (!formIsValid || (!capatchValid && props.formMode === "2")) {
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
      label: t("checkoutForm.ILS"),
    },
    {
      value: "JOD ",
      label: t("checkoutForm.JOD"),
    },
    {
      value: "USD",
      label: t("checkoutForm.USD"),
    },
  ];
  const isArabic = i18next.language === "ar";
  const form = (
    <form className={classes.form} onSubmit={confirmHandler}>
      <Grid
        container
        spacing={2}
        sx={{
          textAlign: "center",
          justifyContent: "center",
          marginTop: "0px",
        }}
      >
        <Grid xs={6} sm={5} item>
          <TextField
            fullWidth
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
        </Grid>
        <Grid xs={6} sm={5} item>
          <TextField
            fullWidth
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
        </Grid>
        {props.formMode === "2" && (
          <Grid xs={12} sm={10} item>
            <TextField
              fullWidth
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
          </Grid>
        )}
        <Grid xs={12} sm={10} item>
          <TextField
            fullWidth
            error={!formInputsValidity.phone}
            id="outlined-controlled"
            label={t("checkoutForm.phone")}
            helperText={
              !formInputsValidity.phone
                ? t("checkoutForm.errorMessages.phone")
                : ""
            }
            onChange={(event) => {
              setPhoneInputValue(event.target.value);
              formInputsValidity.phone = true;
            }}
            value={phoneInputValue}
          />
        </Grid>
        {props.formMode === "1" && (
          <Grid xs={12} sm={10} item>
            <TextField
              fullWidth
              error={!formInputsValidity.city}
              id="outlined-controlled"
              label={t("checkoutForm.city")}
              helperText={
                !formInputsValidity.city
                  ? t("checkoutForm.errorMessages.city")
                  : ""
              }
              onChange={(event) => {
                setCityInputValue(event.target.value);
                formInputsValidity.city = true;
              }}
              value={cityInputValue}
            />
          </Grid>
        )}
        {props.formMode === "1" && (
          <Grid xs={12} sm={10} item>
            <TextField
              fullWidth
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
          </Grid>
        )}
        {props.formMode === "2" && (
          <Grid xs={8} sm={6} item>
            <TextField
              fullWidth
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
                  parseInt(event.target.value) > 0 ? event.target.value : ""
                );
              }}
              value={amountInputValue}
            />
          </Grid>
        )}
        {props.formMode === "2" && (
          <Grid xs={4} item>
            <TextField
              fullWidth
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
            <div className={classes.gap}> </div>
          </Grid>
        )}
        {props.formMode === "2" && (
          <ReCAPTCHA
            sitekey="6LcSuQcoAAAAAEgLc7CQTu59eNeL6bMqLCy7o-WR"
            onChange={capatchHandler}
          />
        )}
      </Grid>

      <div className={classes.actions}>
        <button
          disabled={!capatchValid && props.formMode === "2"}
          className={classes.submit}
        >
          {t("cart.confirm")}
        </button>

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
