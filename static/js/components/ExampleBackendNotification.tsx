import * as API from "baselayer/API";

import { useAppDispatch } from "../store";

function ExampleBackendNotification() {
  const dispatch = useAppDispatch();

  return (
    <section className="card">
      <h2>Backend notification</h2>
      <p>The server sends a notification over the WebSocket.</p>

      <button
        onClick={() => {
          void dispatch(API.GET("/push_notification", "PUSH_NOTIFICATION"));
        }}
        type="button"
      >
        Backend-generated notification
      </button>
    </section>
  );
}

export default ExampleBackendNotification;
