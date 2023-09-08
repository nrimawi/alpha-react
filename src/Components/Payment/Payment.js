import React, { useState } from "react";
import useHttp from "../../hooks/use-http";
import Checkout from "../Cart/Checkout";
import Modal from "../UI/Modal";
import { useTranslation } from "react-i18next";
import classes from "./Payment.module.css";
const Payment = (props) => {
  let transactionReference;
  const { sendRequest: PostPayment } = useHttp();
  const { sendRequest: SendMessage } = useHttp();
  const [t] = useTranslation();
  const [error, setError] = useState(false);
  const [isSuccessPayment, setIsSuccessPayment] = useState(false);
  const [isCheckout, setIsCheckout] = useState(true);
  const [checkoutFormData, SetcheckoutFormData] = useState({});
  const savePaymentHanlder = () => {
    PostPayment(
      {
        url: "https://react-training-394f6-default-rtdb.firebaseio.com/payments.json",
        method: "POST",
        body: JSON.stringify({
          checkoutForm: checkoutFormData,
          transaction: transactionReference,
        }),
      },
      null
    );
  };
  const sendMessageHandler = () => {
    const SMS_CONTENT = `*حركة دفع*: -الاسم:${checkoutFormData.firstname} ${checkoutFormData.lastname} .. المبلغ :${checkoutFormData.amount} ${checkoutFormData.currency} .. جوال:${checkoutFormData.phone}`;
    const SMS_To = "970568348302";
    SendMessage(
      {
        url: `https://sms.htd.ps/API/SendSMS.aspx?id=90cde11b3d6eff8109084f6c6595903e&sender=RSystem&to=${SMS_To}&msg=${SMS_CONTENT}`,
        method: "GET",
      },
      null
    );
  };
  const submitOrderHandler = (checkoutForm) => {
    debugger;
    SetcheckoutFormData(checkoutForm);

    try {
      const lahza = new window.LahzaPopup();
      lahza.newTransaction({
        key: "pk_test_gmabUUaG5y5OAmNjgo3GGVQ44QvmeVZrW",
        email: checkoutForm.email,
        currency: checkoutForm.currency,
        amount: checkoutForm.amount * 100,
        mobile: checkoutForm.phone,
        first_name: checkoutForm.firstName,
        last_name: checkoutForm.lastName,
        onSuccess: (transaction) => {
          debugger;
          transactionReference = transaction;
          savePaymentHanlder();
          sendMessageHandler();
          setIsSuccessPayment(true);
          setIsCheckout(false);
        },
        onCancel: () => {},
      });
    } catch {
      setError(true);
    }
  };
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
      <p>{t("checkoutForm.successPayment")}</p>

      <div className={classes.invoicement}>
        <h3>Invoicement</h3>
        <p>
          <strong> Company:</strong> Alpha for cleaning services
        </p>
        <p>
          {" "}
          <strong>OrderId: </strong>
          {Math.random() * 100000000000000000}
        </p>
        <p>
          <strong>Name: </strong> {checkoutFormData.firstname}{" "}
          {checkoutFormData.lastname}
        </p>
        <p>
          {" "}
          <strong>Email:</strong> {checkoutFormData.email}
        </p>
        <p>
          <strong>Phone:</strong> {checkoutFormData.phone}
        </p>
        <p>
          <strong>Amount:</strong> {checkoutFormData.amount}{" "}
          {checkoutFormData.currency}{" "}
        </p>
        <p>
          <strong>Paid Via: </strong> Debit/Crdit Card
        </p>
      </div>

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
        <p>{t("payment.title")}</p>
      </div>
      {isCheckout && (
        <Checkout
          onConfirm={submitOrderHandler}
          onCancel={props.onClose}
          formMode="2"
        ></Checkout>
      )}

      {!isCheckout && isSuccessPayment && didSubmitModalContent}
      {error && hasError}
    </Modal>
  );
};
export default Payment;
