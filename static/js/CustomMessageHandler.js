import MessageHandler from 'baselayer/MessageHandler';

// You'll probably want to import these, and switch on them
// below: `switch(action)`.
//
// import * as Action from './actions';


const CustomMessageHandler = (dispatch, getState) => (
  new MessageHandler(dispatch, (message) => {
    const { action, payload } = message;

    // eslint-disable-next-line no-console
    console.log('WebSocket', action, payload);

    switch (action) {
      default:
        // If nothing catches the message to do something with it,
        // presume it is an action, and send it to the reducer.
        dispatch({ type: action, data: payload });
    }
  })
);


export default CustomMessageHandler;
