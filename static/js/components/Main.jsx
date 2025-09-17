import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";

import WebSocket from "baselayer/components/WebSocket";
import { Notifications } from "baselayer/components/Notifications";

import { store } from "../store";
import { setupMessageHandlers } from "../customMessageHandler";

// Components and containers

import * as Action from "../actions";
import Profile from "./Profile";
import Examples from "./Examples";

const messageHandler = setupMessageHandlers(store);

function MainContent({ root }) {
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

      <Notifications style={{}} />

      <h1>Baselayer Template Application</h1>
      <p>Hi, and welcome to Baselayer!</p>

      <Examples />
    </>
  );
}
MainContent.propTypes = {
  root: PropTypes.string.isRequired,
};

const content = ReactDOM.createRoot(document.getElementById("content"));
content.render(
  <Provider store={store}>
    <MainContent root={window.location.host + window.location.pathname} />
  </Provider>
);
