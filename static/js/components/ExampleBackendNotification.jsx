import React from "react";
import { useDispatch } from "react-redux";

import * as API from "baselayer/API";

function ExampleBackendNotification() {
  const dispatch = useDispatch();

  return (
    <>
      <h3>Example of a backend-generated notification</h3>

      <button
        href="#"
        onClick={() => {
          dispatch(API.GET("/push_notification", "PUSH_NOTIFICATION"));
        }}
        type="button"
      >
        Backend-generated notification
      </button>
    </>
  );
}

export default ExampleBackendNotification;
