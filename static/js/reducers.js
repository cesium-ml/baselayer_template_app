import { combineReducers } from 'redux';

import { reducer as notificationsReducer } from 'baselayer/components/Notifications';

import * as Action from './actions';


export function profileReducer(state={ username: '' }, action) {
  switch (action.type) {
    case Action.FETCH_USER_PROFILE_OK:
      return action.data;
    default:
      return state;
  }
}

export function exampleReducer(state={ results: [] }, action) {
  switch (action.type) {
    case Action.EXAMPLE_RESULT: {
      const { results } = state;
      const updatedResults = [...results, action.data.squares];

      return { ...state, results: updatedResults };
    }
    default:
      return state;
  }
}

const root = combineReducers({
  profile: profileReducer,
  notifications: notificationsReducer,
  examples: exampleReducer
  // add your own reducers here
});

export default root;
