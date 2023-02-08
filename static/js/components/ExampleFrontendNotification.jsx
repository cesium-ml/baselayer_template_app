import React from "react";
import { useDispatch } from "react-redux";

import { showNotification } from "baselayer/components/Notifications";

const ExampleFrontendNotification = () => {
  const dispatch = useDispatch();

  return (
    <>
      <h3>Example of a frontend-generated notification</h3>

      <button
        type="button"
        href="#"
        onClick={() => dispatch(showNotification("Hello from Baselayer"))}
      >
        Frontend-generated notification
      </button>
    </>
  );
};

export default ExampleFrontendNotification;
