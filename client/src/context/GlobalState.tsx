import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import { CartItemType } from "../App";

export type State = {
  cartItems: CartItemType[];
  currentItem: CartItemType;
};

export type Action = {
  type: string;
  payload: CartItemType;
};

// *Initial state
const initialState = {
  cartItems: [] as CartItemType[],
  currentItem: {} as CartItemType,
};

// *Create context
export const GlobalContext = createContext<{
  state: State;
  dispatch: (action: Action) => void;
}>({
  state: initialState,
  dispatch: () => {},
});

// *Provider component
export const GlobalProvider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
