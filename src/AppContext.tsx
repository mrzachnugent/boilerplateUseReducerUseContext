import React, { FC, createContext, useReducer, useContext } from "react";
import { AppAction, appReducer } from "./reducer";

//IINTERFACES AND TYPES
//This interface allows lines like deepCloned[action.fieldName] = action.payload; to not be an error.
interface IObjectKeys {
  [key: string]: any;
}

export interface StoreStateProps extends IObjectKeys {
  count: number;
  isLoading: boolean;
  error: null | string;
  user: UserStateProps;
  cart?: null | {};
}

interface UserStateProps extends IObjectKeys {
  username: null | string;
  password: null | string;
  isLoggedIn: boolean;
  firstTimer?: boolean;
}

//INITIAL STATES
const userState: UserStateProps = {
  username: null,
  password: null,
  isLoggedIn: false,
};

const storeState: StoreStateProps = {
  count: 1,
  user: userState,
  isLoading: false,
  error: null,
};

type Dispatch = (action: AppAction) => void;

// COMBINING USEREDUCER AND USECONTEXT
const StateContext = createContext<StoreStateProps | undefined>(undefined);
const DispatchContext = createContext<Dispatch | undefined>(undefined);

const AppProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, storeState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

// CUSTOM HOOKS
// One to access state and one to access dispatch
const useAppState = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within a AppProvider");
  }
  return context;
};

const useDispatch = () => {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error("useDispatch must be used within a AppProvider");
  }
  return context;
};

export { AppProvider, useAppState, useDispatch };
