import { useContext } from "react";
import Button from "@material-ui/core/Button";
import { GlobalContext } from "../../context/GlobalState";

// *Types
import { CartItemType } from "../../App";

// *Styles
import { Wrapper } from "./CartItem.styles";

type Props = {
  item: CartItemType;
};

const CartItem: React.FC<Props> = ({ item }) => {
  const { dispatch } = useContext(GlobalContext);

  // *Actions
  function addToCart(clickedItem: CartItemType) {
    dispatch({
      type: "ADD_SINGLE_ITEM_TO_CART",
      payload: clickedItem,
    });
  }

  function removeFromCart(clickedItem: CartItemType) {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: clickedItem,
    });
  }

  function removeAllFromCart(clickedItem: CartItemType) {
    dispatch({
      type: "REMOVE_ALL_FROM_CART",
      payload: clickedItem,
    });
  }

  return (
    <Wrapper>
      <div>
        <h3>{item.title}</h3>
        <div className="information">
          <p>Price: ${item.price}</p>
          <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(item)}
          >
            -
          </Button>
          <p data-testid="item-amount">{item.amount}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCart(item)}
          >
            +
          </Button>
        </div>
      </div>
      <div
        data-testid="remove"
        id="right-panel"
        onClick={() => removeAllFromCart(item)}
      >
        <img src={item.image} alt={item.title} />
      </div>
    </Wrapper>
  );
};

export default CartItem;
