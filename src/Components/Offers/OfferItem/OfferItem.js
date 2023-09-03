import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store/cart";
import { useEffect, useState } from "react";
export default function OfferItem(props) {
  const [addedToCart, setAddedToCart] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id: props.id,
        title: props.title,
        description: props.description,
      })
    );
    setAddedToCart(true);
  };

  const removeFromCart = () => {
    dispatch(cartActions.removeItemFromCart(props.id));
  };

  useEffect(() => {
    setAddedToCart(false);
    const existingCartItemIndex = cartItems.findIndex(
      (item) => item.id === props.id
    );
    if (existingCartItemIndex !== -1) {
      setAddedToCart(true);
    }
  }, [cartItems, props.id]);

  const actionStyle = {
    dispaly: "flex",
    justifyContent: "center",
    width: "100%",
    height: "3rem",
  };

  const buttonStyle = {
    width: "100%",
    height: "100%",
  };
  return (
    <Card sx={{ width: 350, height: 400 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={props.imageURL}
      />
      <CardContent sx={{ minHeight: 210 }}>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions style={actionStyle}>
        {!addedToCart && (
          <Button
            variant="outlined"
            style={buttonStyle}
            onClick={addToCartHandler}
            size="large"
          >
            Add To Cart
          </Button>
        )}

        {addedToCart && (
          <Button
            variant="outlined"
            style={buttonStyle}
            onClick={removeFromCart}
            size="large"
            color="error"
          >
            Remove From Cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
