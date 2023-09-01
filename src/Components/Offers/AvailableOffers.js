import { useEffect, useState } from "react";

import Card from "../UI/Card";
import OfferItem from "./OfferItem/OfferItem";
import classes from "./AvailableOffers.module.css";
import Loader from "../UI/Loader";

const AvailableOffers = () => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchOffers = async () => {
      const response = await fetch(
        "https://react-training-394f6-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

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
      setIsLoading(false);
    };

    fetchOffers().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.OffersLoading}>
        <Loader> </Loader>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.OffersError}>
        <p>{httpError}</p>
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
