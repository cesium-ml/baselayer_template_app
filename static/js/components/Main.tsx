import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { Notifications } from "baselayer/components/Notifications";
import WebSocket from "baselayer/components/WebSocket";

import "../../css/main.css";

import * as Action from "../actions";
import { setupMessageHandlers } from "../customMessageHandler";
import { store } from "../store";

import Examples from "./Examples";
import PoweredByBaselayer from "./PoweredByBaselayer";
import Profile from "./Profile";
import Services from "./Services";

const messageHandler = setupMessageHandlers(store);

function MainContent({ root }: { root: string }) {
  useEffect(() => {
    store.dispatch(Action.hydrate());
  }, []);

  return (
    <>
      <header className="app-header">
        <h1>Baselayer Template Application</h1>
        <div className="app-status">
          <div>
            WebSocket
            <WebSocket
              auth_url={`${window.location.protocol}//${root}baselayer/socket_auth_token`}
              dispatch={store.dispatch}
              messageHandler={messageHandler}
              url={`${
                window.location.protocol === "https:" ? "wss" : "ws"
              }://${root}websocket`}
            />
          </div>
          <Profile />
        </div>
      </header>

      <Notifications />

      <main>
        <Examples />
        <Services />
      </main>

      <footer className="app-footer">
        <PoweredByBaselayer />
      </footer>
    </>
  );
}

const container = document.getElementById("content");
if (!container) {
  throw new Error('static/index.html has no element with id "content"');
}
const content = ReactDOM.createRoot(container);
content.render(
  <Provider store={store}>
    <MainContent root={window.location.host + window.location.pathname} />
  </Provider>,
);
