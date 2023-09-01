import { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import Card from "../UI/Card";
import OfferItem from "./OfferItem/OfferItem";
import classes from "./AvailableOffers.module.css";
import Loader from "../UI/Loader";

const AvailableOffers = () => {
  const [offers, setOffers] = useState([]);
  const { isLoading, error, sendRequest: fetchOffers } = useHttp();

  useEffect(() => {
    const transformOffers = (responseData) => {
      const loadedOffers = [];

      for (const key in responseData) {
        loadedOffers.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setOffers(loadedOffers);
    };

    fetchOffers(
      {
        url: "https://react-training-394f6-default-rtdb.firebaseio.com/meals.json",
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

  const offersList = offers.map((meal) => (
    <OfferItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.offers}>
      <Card>
        <ul>{offersList}</ul>
      </Card>
    </section>
  );
};

export default AvailableOffers;
