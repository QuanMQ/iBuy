import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import { CartItemType, UserType } from "../App";

export type State = {
  cartItems: CartItemType[];
  currentItem: CartItemType;
  currentUser: UserType;
  authenticated: boolean;
};

export type Action = {
  type: string;
  payload?: any;
};

// *Initial state
const initialState = {
  cartItems: [] as CartItemType[],
  currentItem: {} as CartItemType,
  currentUser: {} as UserType,
  authenticated: false,
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
