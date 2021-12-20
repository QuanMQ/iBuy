import { CartItemType, UserType } from "../App";
import { State, Action } from "./GlobalState";

const AppReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "AUTH_CHECK":
      return {
        ...state,
        authenticated: action.payload as boolean,
      };
    case "ADD_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload as UserType,
      };
    case "VIEW_CURRENT_ITEM":
      return {
        ...state,
        currentItem: action.payload as CartItemType,
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
    case "RESET_CART":
      return {
        ...state,
        cartItems: [] as CartItemType[],
      };
    default:
      return state;
  }
};

export default AppReducer;
