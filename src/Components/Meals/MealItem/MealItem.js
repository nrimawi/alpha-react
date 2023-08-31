import { useContext } from "react";
import CartContext from "../../../store/cart-context";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price?.toFixed(2)}`;

  const onAddToCartHandler = (amount) => {
    const itemToAdd = {
      id: props.id,
      name: props.name,
      price: props.price,
      amount: amount,
    };
    cartCtx.addItem(itemToAdd);
  };
  return (
    <div className={styles.meal}>
      <div>
        <div>
          <h3>{props.name}</h3>
        </div>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={onAddToCartHandler} id={props.id} />
      </div>
    </div>
  );
};
export default MealItem;
