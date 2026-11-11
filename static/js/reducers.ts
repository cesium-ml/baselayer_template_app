import { type UnknownAction, combineReducers } from "@reduxjs/toolkit";

import { reducer as notificationsReducer } from "baselayer/components/Notifications";

import * as Action from "./actions";

type DataAction<T> = UnknownAction & {
  data: T;
};

// The type of `data` is not checked: it comes from the server or the WebSocket
function isDataAction<T>(
  action: UnknownAction,
  type: string,
): action is DataAction<T> {
  return action.type === type && "data" in action;
}

export type Profile = {
  username: string;
};

export function profileReducer(
  state: Profile = { username: "" },
  action: UnknownAction,
): Profile {
  if (isDataAction<Profile>(action, Action.FETCH_USER_PROFILE_OK)) {
    return action.data;
  }
  return state;
}

export type ExampleState = {
  results: number[][];
};

export function exampleReducer(
  state: ExampleState = { results: [] },
  action: UnknownAction,
): ExampleState {
  if (isDataAction<{ squares: number[] }>(action, Action.EXAMPLE_RESULT)) {
    return { ...state, results: [...state.results, action.data.squares] };
  }
  return state;
}

const root = combineReducers({
  examples: exampleReducer,
  notifications: notificationsReducer,
  profile: profileReducer,
  // add your own reducers here
});

export default root;
