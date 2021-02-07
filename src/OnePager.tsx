import React, { FC, createContext, useReducer, useContext } from "react";
import cloneDeep from "lodash/cloneDeep";

//IINTERFACES AND TYPES
//This interface allows lines like deepCloned[action.fieldName] = action.payload; to not be an error.
interface IObjectKeys {
  [key: string]: any;
}

interface StoreStateProps extends IObjectKeys {
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

type GlobalPayload = string | null | boolean | number;

type UserPayload = string | null | boolean;

type AppAction =
  | {
      type: "updateGlobal";
      fieldName: string;
      payload: GlobalPayload;
    }
  | {
      type: "addOrUpdateGlobal";
      fieldName: string;
      payload: GlobalPayload;
    }
  | { type: "deleteFromGlobal"; fieldName: string }
  | {
      type: "updateUser";
      fieldName: string;
      payload: UserPayload;
    }
  | {
      type: "addOrUpdateUser";
      fieldName: string;
      payload: UserPayload;
    }
  | { type: "deleteFromUser"; fieldName: string };

type Dispatch = (action: AppAction) => void;

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

// AAPPREDUCER CASES
// Made with three actions in mind for every object : Update, AddOrUpdate, and Delete
// Uses cloneDeep to make a deep clone of the object instead of a shallow clone.
const appReducer = (state: StoreStateProps, action: AppAction) => {
  const deepCloned = cloneDeep(state);
  switch (action.type) {
    //GLOBAL STATE UPDATE, ADDORUPDATE AND DELETE
    case "updateGlobal": {
      if (!(action.fieldName in deepCloned)) {
        console.error(
          "Unable to update key-pair value. The fieldname does not exist in the current storeState."
        );
        return deepCloned;
      } else {
        deepCloned[action.fieldName] = action.payload;
        return deepCloned;
      }
    }
    case "addOrUpdateGlobal": {
      deepCloned[action.fieldName] = action.payload;
      return deepCloned;
    }
    case "deleteFromGlobal": {
      if (!(action.fieldName in deepCloned)) {
        console.error(
          "Unable to delete key-pair value. The fieldname does not exist in the current storeState."
        );
        return deepCloned;
      } else {
        delete deepCloned[action.fieldName];
        return deepCloned;
      }
    }

    //USER STATE UPDATE, ADDORUPDATE AND DELETE
    case "updateUser": {
      if (!(action.fieldName in deepCloned.user)) {
        console.error(
          "Unable to update key-pair value. The fieldname does not exist in the current userState."
        );
        return deepCloned;
      } else {
        deepCloned.user[action.fieldName] = action.payload;
        return deepCloned;
      }
    }
    case "addOrUpdateUser": {
      deepCloned.user[action.fieldName] = action.payload;
      return deepCloned;
    }
    case "deleteFromUser": {
      if (!(action.fieldName in deepCloned.user)) {
        console.error(
          "Unable to delete key-pair value. The fieldname does not exist in the current userState."
        );
        return deepCloned;
      } else {
        delete deepCloned.user[action.fieldName];
        return deepCloned;
      }
    }

    default:
      return deepCloned;
  }
};

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

//export { AppProvider, useAppState, useDispatch };
