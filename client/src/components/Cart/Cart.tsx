import { useContext } from "react";
import { Button, Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import CartItem from "../CartItem/CartItem";
import { GlobalContext } from "../../context/GlobalState";

// *Styles
import { Wrapper, useStyles } from "./Cart.styles";

// *Types
import { CartItemType } from "../../App";

const Cart = () => {
  const {
    state: { cartItems },
  } = useContext(GlobalContext);
  const { button, box } = useStyles();

  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((acc: number, item) => acc + item.amount * item.price, 0);

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 && <span id="noItems">No items in cart.</span>}
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
      {cartItems.length !== 0 && (
        <Box className={box}>
          <Button
            className={button}
            component={Link}
            to="/cart"
            size="large"
            disableElevation
            variant="contained"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            View Cart
          </Button>
          <Button
            className={button}
            component={Link}
            to="/checkout"
            size="large"
            disableElevation
            variant="contained"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            Check Out
          </Button>
        </Box>
      )}
    </Wrapper>
  );
};

export default Cart;
