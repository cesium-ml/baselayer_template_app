import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import messageHandler from 'baselayer/MessageHandler';
import WebSocket from 'baselayer/components/WebSocket';
import { Notifications, showNotification } from 'baselayer/components/Notifications';

import configureStore from '../store';
import '../customMessageHandler';

// Components and containers

import Profile from '../containers/Profile';
import Examples from '../containers/Examples';

// Actions

import * as Action from '../actions';

import * as API from 'baselayer/API';

// Set up store and message handling

const store = configureStore({});
messageHandler.init(store.dispatch, store.getState);


class MainContent extends React.Component {
  componentDidMount() {
    // Typically, you want to load some initial application state.  That
    // happens here.
    //
    // See also `../Actions.js`.
    //
    store.dispatch(Action.hydrate());
  }

  render() {
    return (
      <div>

        <div style={{ float: "right" }}>
          <b>WebSocket connection: </b>
          <WebSocket
            url={`${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${this.props.root}websocket`}
            auth_url={`${window.location.protocol}//${this.props.root}baselayer/socket_auth_token`}
            messageHandler={messageHandler}
            dispatch={store.dispatch}
      />
      <Profile />
        </div>

        <Notifications style={{}} />

        <h1>Baselayer Template Application</h1>
        <p>Hi, and welcome to Baselayer!</p>

        <h3>Example of a frontend-generated notification</h3>

        <button
          href="#"
          onClick={() => store.dispatch(showNotification("Hello from Baselayer"))}
        >
          Frontend-generated notification
        </button>

        <h3>Example of a backend-generated notification</h3>

        <button
          href="#"
          onClick={() => { store.dispatch(API.GET('/push_notification', 'PUSH_NOTIFICATION')); }}
        >
          Backend-generated notification
        </button>

        <Examples />

      </div>
    );
  }
}

MainContent.propTypes = {
  root: PropTypes.string.isRequired
};


ReactDOM.render(
  <Provider store={store}>
    <MainContent root={window.location.host + window.location.pathname} />
  </Provider>,
  document.getElementById('content')
);
