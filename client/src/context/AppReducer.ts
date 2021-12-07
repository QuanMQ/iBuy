import { CartItemType } from "../App";
import { State, Action } from "./GlobalState";

const AppReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "VIEW_CURRENT_ITEM":
      return {
        ...state,
        currentItem: action.payload,
      };
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
    case "ADD_SINGLE_ITEM_TO_CART":
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
            if (item.amount <= 1) return acc;
            return [...acc, { ...item, amount: item.amount - 1 }];
          } else {
            return [...acc, item];
          }
        }, [] as CartItemType[]),
      };
    case "REMOVE_ALL_FROM_CART":
      return {
        ...state,
        cartItems: [...state.cartItems].reduce((acc, item) => {
          if (item.id === action.payload.id) {
            return acc;
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
