import React, { useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import Checkout from "./Checkout";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";
import useHttp from "../../hooks/use-http";

const Cart = (props) => {
  const { isLoading, error, sendRequest: PostOrder } = useHttp();

  const dispatch = useDispatch();
  const storedCartTotalAmount = `$${useSelector(
    (state) => state.cart.totalAmount
  )}`;
  const storedCartItem = useSelector((state) => state.cart.items);
  const [isCheckout, setIsCheckout] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const hasItems = storedCartItem.length > 0;

  const cartItemRemoveHandler = (id) => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  const cartItemAddHandler = (item) => {
    dispatch(cartActions.addItemToCart({ ...item }));
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    PostOrder(
      {
        url: "https://react-training-394f6-default-rtdb.firebaseio.com/orders.json",
        method: "POST",
        body: JSON.stringify({ user: userData, orderedItems: storedCartItem }),
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
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{storedCartTotalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const hasError = (
    <React.Fragment>
      <p>Error at submitting the order : {error}</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );
  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isLoading && !didSubmit && cartModalContent}
      {isLoading && isSubmittingModalContent}
      {!isLoading && didSubmit && !error && didSubmitModalContent}
      {!isLoading && didSubmit && error && hasError}
    </Modal>
  );
};

export default Cart;
