import { Fragment, useState } from "react";
import "./App.css";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header/Header.js";
import Offers from "./Components/Offers/Offers";
import { useTranslation } from "react-i18next";
function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const { i18n } = useTranslation();

  // Detect the selected language
  const isArabic = i18n.language === "ar";

  // Set the HTML direction attribute
  const htmlDir = isArabic ? "rtl" : "ltr";
  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <Fragment>
      <html dir={htmlDir}>
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        <Header onShowCart={showCartHandler} />
        <main>
          <Offers />
        </main>
      </html>
    </Fragment>
  );
}

export default App;
