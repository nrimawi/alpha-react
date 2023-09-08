import React, { useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import Checkout from "./Checkout";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";
import useHttp from "../../hooks/use-http";
import { useTranslation } from "react-i18next";

const Cart = (props) => {
  const { isLoading, error, sendRequest: PostOrder } = useHttp();
  const { sendRequest: sendMessage } = useHttp();
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const storedCartItem = useSelector((state) => state.cart.items);

  const [isCheckout, setIsCheckout] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const hasItems = storedCartItem.length > 0;

  const cartItemRemoveHandler = (id) => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (checkoutFormData) => {
    debugger;

    PostOrder(
      {
        url: "https://react-training-394f6-default-rtdb.firebaseio.com/orders.json",
        method: "POST",
        body: { ...checkoutFormData, Date: Date.now },
      },
      null
    );

    let offers = "";
    storedCartItem.forEach((element) => {
      offers = offers + element.title_ar + ",";
    });
    offers = offers.slice(0, -1);
    const SMS_CONTENT = `*طلب خدمات* الاسم:${checkoutFormData.firstname} ${checkoutFormData.lastname} .. جوال:${checkoutFormData.phone} .. العنوان:${checkoutFormData.city}/${checkoutFormData.address} .. الخدمات:${offers}`;
    const SMS_To = "970599646099";
    sendMessage(
      {
        url: `https://sms.htd.ps/API/SendSMS.aspx?id=90cde11b3d6eff8109084f6c6595903e&sender=RSystem&to=${SMS_To}&msg=${SMS_CONTENT}`,
        method: "GET",
      },
      null
    );

    setDidSubmit(true);
    dispatch(cartActions.clearCart());
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {storedCartItem.map((item) => (
        <CartItem
          key={item.id}
          title={item.title}
          title_ar={item.title_ar}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          {t("cart.order")}
        </button>
      )}
      <button className={classes["button--alt"]} onClick={props.onClose}>
        {t("cart.close")}
      </button>
    </div>
  );
  const cartModalContent = (
    <React.Fragment>
      {hasItems && !isCheckout && cartItems}
      {!hasItems && <p className={classes.empty}>{t("cart.empty")} </p>}

      {isCheckout && (
        <Checkout
          onConfirm={submitOrderHandler}
          onCancel={() => setIsCheckout(false)}
          formMode="1"
        />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>{t("checkoutForm.sendingOrder")}</p>;

  const hasError = (
    <React.Fragment>
      <p>{t("checkoutForm.errorSemding")}</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          {t("cart.close")}
        </button>
      </div>
    </React.Fragment>
  );
  const didSubmitModalContent = (
    <React.Fragment>
      <p>{t("checkoutForm.successOrder")}</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          {t("cart.close")}
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      <div className={classes["cart-title"]}>
        <p>{t("cart.title")}</p>
      </div>
      {!isLoading && !didSubmit && cartModalContent}
      {isLoading && isSubmittingModalContent}
      {!isLoading && didSubmit && !error && didSubmitModalContent}
      {!isLoading && didSubmit && error && hasError}
    </Modal>
  );
};

export default Cart;
