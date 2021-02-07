import cloneDeep from "lodash/cloneDeep";
import { StoreStateProps } from "./AppContext";

//TYPES
type GlobalPayload = string | null | boolean | number;

type UserPayload = string | null | boolean;

export type AppAction =
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

export const appReducer = (state: StoreStateProps, action: AppAction) => {
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
