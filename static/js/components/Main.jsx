import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";

import messageHandler from "baselayer/MessageHandler";
import WebSocket from "baselayer/components/WebSocket";
import { Notifications } from "baselayer/components/Notifications";

import configureStore from "../store";
import "../customMessageHandler";

// Components and containers

import Profile from "./Profile";
import Examples from "./Examples";

// Actions

import * as Action from "../actions";

// Set up store and message handling

const store = configureStore({});
messageHandler.init(store.dispatch, store.getState);

const MainContent = ({ root }) => {
  useEffect(() => {
    store.dispatch(Action.hydrate());
  }, []);

  return (
    <>
      <div style={{ float: "right" }}>
        <b>WebSocket connection: </b>
        <WebSocket
          url={`${
            window.location.protocol === "https:" ? "wss" : "ws"
          }://${root}websocket`}
          auth_url={`${window.location.protocol}//${root}baselayer/socket_auth_token`}
          messageHandler={messageHandler}
          dispatch={store.dispatch}
        />
        <Profile />
      </div>

      <Notifications style={{}} />

      <h1>Baselayer Template Application</h1>
      <p>Hi, and welcome to Baselayer!</p>

      <Examples />
    </>
  );
};
MainContent.propTypes = {
  root: PropTypes.string.isRequired,
};

ReactDOM.render(
  <Provider store={store}>
    <MainContent root={window.location.host + window.location.pathname} />
  </Provider>,
  document.getElementById("content")
);
