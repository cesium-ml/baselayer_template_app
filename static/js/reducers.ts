import { combineReducers, type UnknownAction } from "@reduxjs/toolkit";

import { reducer as notificationsReducer } from "baselayer/components/Notifications";

import * as Action from "./actions";

type DataAction<T> = UnknownAction & {
  data: T;
};

export type Profile = {
  username: string;
};

export function profileReducer(
  state: Profile = { username: "" },
  action: UnknownAction,
): Profile {
  switch (action.type) {
    case Action.FETCH_USER_PROFILE_OK:
      return (action as DataAction<Profile>).data;
    default:
      return state;
  }
}

export type ExampleState = {
  results: number[][];
};

export function exampleReducer(
  state: ExampleState = { results: [] },
  action: UnknownAction,
): ExampleState {
  switch (action.type) {
    case Action.EXAMPLE_RESULT: {
      const { squares } = (action as DataAction<{ squares: number[] }>).data;
      return { ...state, results: [...state.results, squares] };
    }
    default:
      return state;
  }
}

const root = combineReducers({
  profile: profileReducer,
  notifications: notificationsReducer,
  examples: exampleReducer,
  // add your own reducers here
});

export default root;
