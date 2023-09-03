import { useTranslation } from "react-i18next";
import classes from "./Home.module.css";
import homePagePhoto from "../../../../assets/gradientPhoto.png";
import Button from "@mui/material/Button";

const Home = () => {
  const [t] = useTranslation();

  const handleScroll = () => {
    // Scroll the page to a specific position when the button is clicked
    window.scrollTo({
      top: window.innerHeight - 70, // Adjust this value to scroll to the desired position
      behavior: "smooth", // Add smooth scrolling animation
    });
  };

  return (
    <div className="home">
      <div className={classes["main-image"]}>
        <img src={homePagePhoto} alt="A table full of delicious food!" />
      </div>

      <section className={classes.summary}>
        <h2>{t("aboutUs.title")}</h2>
        <p>{t("aboutUs.subTitle")}</p>

        <Button
          fontFamily={"inherit"}
          onClick={handleScroll}
          variant="contained"
        >
          {t("aboutUs.ourServices")}
        </Button>
      </section>
    </div>
  );
};

export default Home;
