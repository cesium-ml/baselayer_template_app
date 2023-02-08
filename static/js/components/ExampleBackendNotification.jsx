import React from "react";
import { useDispatch } from "react-redux";

import * as API from "baselayer/API";

const ExampleBackendNotification = () => {
  const dispatch = useDispatch();

  return (
    <>
      <h3>Example of a backend-generated notification</h3>

      <button
        type="button"
        href="#"
        onClick={() => {
          dispatch(API.GET("/push_notification", "PUSH_NOTIFICATION"));
        }}
      >
        Backend-generated notification
      </button>
    </>
  );
};

export default ExampleBackendNotification;
