import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import { CartItemType } from "../App";

type Action = {
  type: string;
  payload: CartItemType;
};

// *Initial state
const initialState = {
  cartItems: [] as CartItemType[],
};

// *Create context
export const GlobalContext = createContext<{
  state: typeof initialState;
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
