import { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import classes from "./AvailableOffers.module.css";
import Loader from "../UI/Loader";
import i18next from "i18next";
import OfferItem from "../Offers/OfferItem/OfferItem";
import { useTranslation } from "react-i18next";

const AvailableOffers = () => {
  const [offers, setOffers] = useState([]);
  const { isLoading, error, sendRequest: fetchOffers } = useHttp();
  const [t] = useTranslation();

  useEffect(() => {
    const transformOffers = (responseData) => {
      const loadedOffers = [];

      for (const key in responseData) {
        loadedOffers.push({
          id: key,
          title_ar: responseData[key].title_ar,
          title_en: responseData[key].title_en,
          description_en: responseData[key].description_en,
          description_ar: responseData[key].description_ar,
          imageURL: responseData[key].imageURL,
        });
      }
      setOffers(loadedOffers);
    };

    fetchOffers(
      {
        url: "https://react-training-394f6-default-rtdb.firebaseio.com/Offers.json",
      },
      transformOffers
    );
  }, [fetchOffers]);

  if (isLoading) {
    return (
      <section className={classes.OffersLoading}>
        <Loader> </Loader>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.OffersError}>
        <p>{error}</p>
      </section>
    );
  }

  const offersList = offers.map((offer) => (
    <OfferItem
      key={offer.id}
      id={offer.id}
      title={i18next.language === "ar" ? offer.title_ar : offer.title_en}
      description={
        i18next.language === "ar" ? offer.description_ar : offer.description_en
      }
      imageURL={offer.imageURL}
    />
  ));

  return (
    <section>
      <h1 className={classes.sectionTitle}>{t("offers.title")}</h1>
      <div className={classes.offers}>{offersList}</div>
    </section>
  );
};

export default AvailableOffers;
