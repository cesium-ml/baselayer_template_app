import * as API from "baselayer/API";

import { useAppDispatch } from "../store";

function ExampleBackendNotification() {
  const dispatch = useAppDispatch();

  return (
    <>
      <h3>Example of a backend-generated notification</h3>

      <button
        onClick={() => {
          void dispatch(API.GET("/push_notification", "PUSH_NOTIFICATION"));
        }}
        type="button"
      >
        Backend-generated notification
      </button>
    </>
  );
}

export default ExampleBackendNotification;
