import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/use-http";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const { isLoading, error, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    const transformMealsData = (MealsObj) => {
      const loadedMeals = [];

      for (const key in MealsObj) {
        loadedMeals.push({
          id: MealsObj[key].id,
          name: MealsObj[key].name,
          description: MealsObj[key].description,
          price: MealsObj[key].price,
        });
      }

      setMeals(loadedMeals);
    };

    fetchMeals(
      {
        url: "https://react-training-394f6-default-rtdb.firebaseio.com/meals.json",
      },
      transformMealsData
    );
  }, [fetchMeals]);

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }
  if (isLoading) {
    return <p className={styles.loading}>Loading..</p>;
  }

  return (
    <section className={styles.meals}>
      <Card>
        <ul>
          {meals.map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              price={meal.price}
              description={meal.description}
              name={meal.name}
            ></MealItem>
          ))}
        </ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
