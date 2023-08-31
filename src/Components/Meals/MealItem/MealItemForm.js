import { useRef, useState } from "react";
import Input from "../../UI/Input.js";
import styles from "./MealItemForm.module.css";
const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enterdAmount = amountInputRef.current.value;
    const enterdAmountNum = +enterdAmount;
    if (
      enterdAmount.trim().length === 0 ||
      enterdAmountNum < 1 ||
      enterdAmount > 5
    ) {
      debugger;
      setAmountIsValid(false);
      return;
    }
    debugger;
    setAmountIsValid(true);
    props.onAddToCart(enterdAmountNum);
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      ></Input>
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount</p>}
    </form>
  );
};
export default MealItemForm;
