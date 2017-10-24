import React from 'react';
import { connect, Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import WebSocket from 'baselayer/components/WebSocket';
import { Notifications, reducer as notificationReducer, showNotification }
           from 'baselayer/components/Notifications';
import MessageHandler from 'baselayer/MessageHandler';

// Construct the application state store
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

function defaultReducer(state={}, action) {
    switch (action.type) {
        default:
            console.log('Default reducer saw action:', action);
            return state;
    }
}

let store = createStore(
    combineReducers({
        default: defaultReducer,
        notifications: notificationReducer
    }),
    applyMiddleware(thunk)
);
// End store construction


const messageHandler = (new MessageHandler(store.dispatch));

class MainContent extends React.Component {
  componentDidMount() {
    // Typically, you want to load some initial application state.  That
    // happens here.
    //
    // store.dispatch(Action.hydrate());
  }
  render() {
    // TODO display username dynamically; currently hard-coded for tests
    return (
      <div>
        <div style={{float: "right"}}>
          <b>WebSocket connection: </b>
          <WebSocket
              url={`${location.protocol == 'https:' ? 'wss' : 'ws'}://${this.props.root}websocket`}
              auth_url={`${location.protocol}//${this.props.root}socket_auth_token`}
              messageHandler={messageHandler}
              dispatch={store.dispatch}
          />
        </div>

        <Notifications style={{}} />

        <h1>Baselayer Template Application</h1>
        <p>Hi, and welcome to Baselayer, testuser@cesium-ml.org!</p>

        <a href="#"
           onClick={() => store.dispatch(showNotification("Hello from Baselayer"))}>
          Click here to display a notification
        </a>
      </div>
    );
  }
}
//const mapStateToProps = function (state) (
//);
//const mapDispatchToProps = dispatch => (
//);
//
//MainContent = connect(mapStateToProps, mapDispatchToProps)(MainContent);

ReactDOM.render(
  <Provider store={store}>
    <MainContent root={location.host + location.pathname} />
  </Provider>,
  document.getElementById('content')
);
