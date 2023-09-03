import { useEffect, useState } from "react";

import CartIcon from "../../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
const HeaderCartButton = (props) => {
  const [t] = useTranslation();
  const CartItems = useSelector((state) => state.cart.items);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const numberOfCartItems = CartItems.length;

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (CartItems.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [CartItems]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>

      <span className={classes.title}>{t("cart.yourCart")}</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
