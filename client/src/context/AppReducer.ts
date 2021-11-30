import { CartItemType } from "../App";

type State = {
  cartItems: CartItemType[];
};

type Action = {
  type: string;
  payload: CartItemType;
};

const AppReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TO_CART":
      // *Is the item already added in the cart?
      const isItemInCart = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (isItemInCart) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, amount: action.payload.amount }
              : item
          ),
        };
      } else {
        // *First time the item is added
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }
    case "ADD_TO_CART_2":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, amount: item.amount + 1 }
            : item
        ),
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: [...state.cartItems].reduce((acc, item) => {
          if (item.id === action.payload.id) {
            if (item.amount === 1) return acc;
            return [...acc, { ...item, amount: item.amount - 1 }];
          } else {
            return [...acc, item];
          }
        }, [] as CartItemType[]),
      };
    default:
      return state;
  }
};

export default AppReducer;
