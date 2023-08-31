import styles from "./Checkout.module.css";
import useInput from "../../hooks/use-input";
import useHttp from "../../hooks/use-http";
const Checkout = (props) => {
  const {
    value: enteredNameValue,
    isValid: enteredNameIsValid,
    hasError: enteredNameHasError,
    valueChangeHandler: enteredNameChangeHandler,
    inputBlurHandler: inputNameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredStreetValue,
    isValid: enteredStreetIsValid,
    hasError: enteredStreetHasError,
    valueChangeHandler: enteredStreetChangeHandler,
    inputBlurHandler: inputStreetBlurHandler,
    reset: resetStreetInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredPostalValue,
    isValid: enteredPostalIsValid,
    hasError: enteredPostalHasError,
    valueChangeHandler: enteredPostalChangeHandler,
    inputBlurHandler: inputPostalBlurHandler,
    reset: resetPostalInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredCityValue,
    isValid: enteredCityIsValid,
    hasError: enteredCityHasError,
    valueChangeHandler: enteredCityChangeHandler,
    inputBlurHandler: inputCityBlurHandler,
    reset: resetCityInput,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (
    enteredStreetIsValid &&
    enteredCityIsValid &&
    enteredPostalIsValid &&
    enteredNameIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredNameValue,
      city: enteredCityValue,
      street: enteredStreetValue,
      postalCode: enteredPostalValue,
    });
    resetNameInput();
    resetCityInput();
    resetStreetInput();
    resetPostalInput();
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div
        className={`${styles.control} ${enteredNameHasError && styles.invalid}`}
      >
        <label htmlFor="name">Your Name</label>
        <input
          value={enteredNameValue}
          onChange={enteredNameChangeHandler}
          onBlur={inputNameBlurHandler}
          type="text"
          id="name"
        ></input>
        {enteredNameHasError && (
          <p className={styles["error-test"]}>Please fill correct value</p>
        )}
      </div>

      <div
        className={`${styles.control} ${
          enteredStreetHasError && styles.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input
          value={enteredStreetValue}
          onChange={enteredStreetChangeHandler}
          onBlur={inputStreetBlurHandler}
          type="text"
          id="street"
        ></input>
        {enteredStreetHasError && (
          <p className={styles["error-test"]}>Please fill correct value</p>
        )}
      </div>

      <div
        className={`${styles.control} ${
          enteredPostalHasError && styles.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input
          value={enteredPostalValue}
          onChange={enteredPostalChangeHandler}
          onBlur={inputPostalBlurHandler}
          type="text"
          id="postal"
        ></input>
        {enteredPostalHasError && (
          <p className={styles["error-test"]}>Please fill correct value</p>
        )}
      </div>

      <div
        className={`${styles.control} ${enteredCityHasError && styles.invalid}`}
      >
        <label htmlFor="city">City</label>
        <input
          value={enteredCityValue}
          onChange={enteredCityChangeHandler}
          onBlur={inputCityBlurHandler}
          type="text"
          id="city"
        ></input>
        {enteredCityHasError && (
          <p className={styles["error-test"]}>Please fill correct value</p>
        )}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button disabled={!formIsValid} className={styles.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};
export default Checkout;
