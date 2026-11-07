import { showNotification } from "baselayer/components/Notifications";

import { useAppDispatch } from "../store";

function ExampleFrontendNotification() {
  const dispatch = useAppDispatch();

  return (
    <section className="card">
      <h2>Frontend notification</h2>
      <p>The browser shows a notification without asking the server.</p>

      <button
        onClick={() => {
          dispatch(showNotification("Hello from Baselayer"));
        }}
        type="button"
      >
        Frontend-generated notification
      </button>
    </section>
  );
}

export default ExampleFrontendNotification;
