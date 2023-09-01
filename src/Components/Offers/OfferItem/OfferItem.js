import OfferItemForm from "./OfferItemForm";
import classes from "./OfferItem.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cart";
const OfferItem = (props) => {
  const dispatch = useDispatch();

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    dispatch(
      cartActions.addItemToCart({
        id: props.id,
        name: props.name,
        amount: amount,
        price: props.price,
      })
    );
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <OfferItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default OfferItem;
