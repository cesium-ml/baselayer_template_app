import messageHandler from "baselayer/MessageHandler";
import * as Action from "./actions.js";

export const setupMessageHandlers = (store) => {
  messageHandler.init(store.dispatch, store.getState);

  messageHandler.add((actionType, payload, dispatch) => {
    // eslint-disable-next-line no-console
    console.log("WebSocket message received:", actionType, payload);

    // For this example app, we simply take incoming websocket messages
    // and turn them into actions on the frontend.
    if (actionType === Action.EXAMPLE_RESULT) {
      dispatch({ type: actionType, data: payload });
    }
  });

  return messageHandler;
};
