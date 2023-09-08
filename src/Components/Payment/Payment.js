import React, { useState } from "react";
import useHttp from "../../hooks/use-http";
import Checkout from "../Cart/Checkout";
import Modal from "../UI/Modal";
import { useTranslation } from "react-i18next";
import classes from "./Payment.module.css";
const Payment = (props) => {
  const [paymentId, setPaymentId] = useState("");
  let transactionReference;
  const { sendRequest: PostPayment } = useHttp();
  const { sendRequest: SendMessage } = useHttp();
  const [t] = useTranslation();
  const [error, setError] = useState(false);
  const [isSuccessPayment, setIsSuccessPayment] = useState(false);
  const [isCheckout, setIsCheckout] = useState(true);
  const [checkoutFormData, setCheckoutFormData] = useState({});

  const responseDataHandler = (responseData) => {
    debugger;
    setPaymentId(responseData["name"].substring(1));
    console.log();
  };

  const savePaymentHanlder = (checkoutData) => {
    PostPayment(
      {
        url: "https://react-training-394f6-default-rtdb.firebaseio.com/payments.json",
        method: "POST",
        body: JSON.stringify({
          checkoutForm: checkoutData,
          transaction: transactionReference,
        }),
      },
      responseDataHandler
    );
  };
  const sendMessageHandler = (checkoutData) => {
    const SMS_CONTENT = `*حركة دفع*: -الاسم:${checkoutData.firstname} ${checkoutData.lastname} .. المبلغ :${checkoutData.amount} ${checkoutData.currency} .. جوال:${checkoutData.phone}`;
    const SMS_To = "970568348302";
    SendMessage(
      {
        url: `https://sms.htd.ps/API/SendSMS.aspx?id=90cde11b3d6eff8109084f6c6595903e&sender=RSystem&to=${SMS_To}&msg=${SMS_CONTENT}`,
        method: "GET",
      },
      null
    );
  };
  const submitPaymentHandler = (checkoutForm) => {
    debugger;
    setCheckoutFormData(checkoutForm);

    console.log(checkoutFormData);
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
          savePaymentHanlder(checkoutForm);
          sendMessageHandler(checkoutForm);
          setIsSuccessPayment(true);
          setIsCheckout(false);
        },
        onCancel: () => {},
      });
    } catch {
      setError(true);
    }
  };

  const checkoutForm = (
    <React.Fragment>
      <div>
        <div className={classes["payment-title"]}>
          <p>{t("payment.title")}</p>
        </div>

        <Checkout
          onConfirm={submitPaymentHandler}
          onCancel={props.onClose}
          formMode="2"
        ></Checkout>
      </div>
    </React.Fragment>
  );
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
  const successPayment = (
    <React.Fragment>
      <div className={classes.invoicement}>
        <h2>{t("invoicement.title")}</h2>
        <p>
          <strong> {t("invoicement.company")}</strong>
          {t("invoicement.companyName")}
        </p>
        <p>
          {" "}
          <strong> {t("invoicement.orderId")}</strong>
          {paymentId}
        </p>
        <p>
          <strong> {t("invoicement.customerName")}</strong>{" "}
          {checkoutFormData.firstname} {checkoutFormData.lastname}
        </p>
        <p>
          {" "}
          <strong>{t("invoicement.email")}</strong> {checkoutFormData.email}
        </p>
        <p>
          <strong>{t("invoicement.phone")}</strong> {checkoutFormData.phone}
        </p>
        <p>
          <strong>{t("invoicement.amount")}</strong> {checkoutFormData.amount}{" "}
          {checkoutFormData.currency}{" "}
        </p>
        <p>
          <strong>{t("invoicement.paidVia")} </strong>{" "}
          {t("invoicement.paidViaValue")}
        </p>
      </div>
      <p className={classes.note}>{t("invoicement.note")}</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          {t("cart.close")}
        </button>
      </div>
    </React.Fragment>
  );
  return (
    <Modal onClose={props.onClose}>
      <div>
        {isCheckout && checkoutForm}
        {!isCheckout && isSuccessPayment && successPayment}
        {error && hasError}
      </div>
    </Modal>
  );
};
export default Payment;
