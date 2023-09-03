import { useTranslation } from "react-i18next";
import Card from "../UI/Card";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const [t, i18n] = useTranslation();
  return (
    <Card>
      <li className={classes["cart-item"]}>
        <div>
          <h3>{i18n.language === "ar" ? props.title_ar : props.title}</h3>
        </div>
        <div className={classes.actions}>
          <button onClick={props.onRemove}>{t("cart.remove")}</button>
        </div>
      </li>
    </Card>
  );
};

export default CartItem;
