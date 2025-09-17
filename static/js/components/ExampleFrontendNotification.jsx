import React from "react";
import { useDispatch } from "react-redux";

import { showNotification } from "baselayer/components/Notifications";

function ExampleFrontendNotification() {
  const dispatch = useDispatch();

  return (
    <>
      <h3>Example of a frontend-generated notification</h3>

      <button
        href="#"
        onClick={() => dispatch(showNotification("Hello from Baselayer"))}
        type="button"
      >
        Frontend-generated notification
      </button>
    </>
  );
}

export default ExampleFrontendNotification;
