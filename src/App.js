import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header/Header.js";
import Offers from "./Components/Offers/Offers";
import { useTranslation } from "react-i18next";
import Home from "./Components/Layout/Header/Home/Home";
import ComunicationLinks from "./Components/UI/CommunicationsLinks";
import Payment from "./Components/Payment/Payment";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [paymentIsShown, setPaymentIsShown] = useState(false);

  const { i18n } = useTranslation();
  useEffect(() => {
    window.scrollTo({
      top: 1, // Adjust this value to scroll to the desired position
      behavior: "smooth", // Add smooth scrolling animation
    });
  }, []);
  // Detect the selected language
  const isArabic = i18n.language === "ar";

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  const showPaymentHandler = () => {
    setPaymentIsShown(true);
  };

  const hidePaymentHandler = () => {
    setPaymentIsShown(false);
  };

  React.useLayoutEffect(() => {
    document.body.setAttribute("dir", isArabic ? "rtl" : "ltr");
  }, [isArabic]);

  return (
    <Fragment>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      {paymentIsShown && <Payment onClose={hidePaymentHandler} />}
      <Home />
      <ComunicationLinks></ComunicationLinks>
      <Header onShowCart={showCartHandler} onShowPayment={showPaymentHandler} />
      <main>
        <Offers />
      </main>
    </Fragment>
  );
}

export default App;
