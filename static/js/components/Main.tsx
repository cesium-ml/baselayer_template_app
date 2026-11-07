import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { Notifications } from "baselayer/components/Notifications";
import WebSocket from "baselayer/components/WebSocket";

import * as Action from "../actions";
import { setupMessageHandlers } from "../customMessageHandler";
import { store } from "../store";
import Examples from "./Examples";
import PoweredByBaselayer from "./PoweredByBaselayer";
import Profile from "./Profile";

const messageHandler = setupMessageHandlers(store);

function MainContent({ root }: { root: string }) {
  useEffect(() => {
    store.dispatch(Action.hydrate());
  }, []);

  return (
    <>
      <div style={{ float: "right" }}>
        <b>WebSocket connection: </b>
        <WebSocket
          auth_url={`${window.location.protocol}//${root}baselayer/socket_auth_token`}
          dispatch={store.dispatch}
          messageHandler={messageHandler}
          url={`${
            window.location.protocol === "https:" ? "wss" : "ws"
          }://${root}websocket`}
        />
        <Profile />
      </div>

      <Notifications />

      <h1>Baselayer Template Application</h1>
      <p>Hi, and welcome to Baselayer!</p>

      <Examples />

      <PoweredByBaselayer />
    </>
  );
}

const content = ReactDOM.createRoot(document.getElementById("content")!);
content.render(
  <Provider store={store}>
    <MainContent root={window.location.host + window.location.pathname} />
  </Provider>,
);
