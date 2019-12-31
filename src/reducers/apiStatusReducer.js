import * as types from "../actions/actionType";
import initialState from "./initialState";

export default function apiCallStatusReducer(
  state = initialState.apiCallInProgress,
  action
) {
  if (action.type === types.SWITCH) {
    return state === true ? false : true;
  }

  return state;
}
