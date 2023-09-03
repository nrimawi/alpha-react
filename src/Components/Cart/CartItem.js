import Card from "../UI/Card";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  return (
    <Card>
      <li className={classes["cart-item"]}>
        <div>
          <h2>{props.title}</h2>
        </div>
        <div className={classes.actions}>
          <button onClick={props.onRemove}>Remove</button>
        </div>
      </li>
    </Card>
  );
};

export default CartItem;
