import useHttp from "../../hooks/use-http";
import Checkout from "../Cart/Checkout";
import Modal from "../UI/Modal";

const Payment = (props) => {
  let transactionReference;
  let checkoutFormData;
  const { sendRequest: PostPayment } = useHttp();
  const { sendRequest: sendMessage } = useHttp();

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
    const SMS_To = "970599646099";
    sendMessage(
      {
        url: `http://sms.htd.ps/API/SendSMS.aspx?id=90cde11b3d6eff8109084f6c6595903e&sender=RSystem&to=${SMS_To}&msg=${SMS_CONTENT}`,
        method: "GET",
      },
      null
    );
  };
  const submitOrderHandler = (checkoutForm) => {
    checkoutFormData = checkoutForm;
    debugger;
    const lahza = new window.LahzaPopup();
    lahza.newTransaction({
      key: "pk_test_gmabUUaG5y5OAmNjgo3GGVQ44QvmeVZrW",
      email: checkoutForm.email,
      currency: checkoutForm.currency,
      amount: checkoutForm.amount * 100,
      mobile: checkoutForm.phone,
      onSuccess: (transaction) => {
        debugger;
        transactionReference = transaction;
        savePaymentHanlder();
        sendMessageHandler();
      },
      onCancel: () => {
        alert("Window closed.");
      },
    });
  };

  return (
    <Modal onClose={props.onClose}>
      <Checkout
        onConfirm={submitOrderHandler}
        onCancel={props.onClose}
        formMode="2"
      ></Checkout>
    </Modal>
  );
};
export default Payment;
