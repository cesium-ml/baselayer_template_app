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

export type Service = {
  forked: boolean;
  memory: number;
  name: string;
  pid: number | null;
  state: string;
  uptime: number | null;
};

export type ServicesState = {
  preload: string[];
  services: Service[];
};

export function servicesReducer(
  state: ServicesState = { preload: [], services: [] },
  action: UnknownAction,
): ServicesState {
  if (isDataAction<ServicesState>(action, Action.FETCH_SERVICES_OK)) {
    return action.data;
  }
  return state;
}

const root = combineReducers({
  examples: exampleReducer,
  notifications: notificationsReducer,
  profile: profileReducer,
  services: servicesReducer,
  // add your own reducers here
});

export default root;
