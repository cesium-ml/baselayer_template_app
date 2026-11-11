import type { Dispatch } from "@reduxjs/toolkit";

import messageHandler from "baselayer/MessageHandler";

import * as Action from "./actions";
import type { AppStore } from "./store";

export const setupMessageHandlers = (store: AppStore) => {
  messageHandler.init(store.dispatch, () => store.getState());

  messageHandler.add(
    (actionType: string, payload: unknown, dispatch: Dispatch) => {
      console.log("WebSocket message received:", actionType, payload);

      // For this example app, we simply take incoming websocket messages
      // and turn them into actions on the frontend.
      if (actionType === Action.EXAMPLE_RESULT) {
        dispatch({ data: payload, type: actionType });
      }
    },
  );

  return messageHandler;
};
