import { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";
import homePagePhoto from "../../../assets/HomePageIcon.png";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Alpha Cleaning</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={homePagePhoto} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
