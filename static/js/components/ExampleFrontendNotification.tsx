import { showNotification } from "baselayer/components/Notifications";

import { useAppDispatch } from "../store";

function ExampleFrontendNotification() {
  const dispatch = useAppDispatch();

  return (
    <>
      <h3>Example of a frontend-generated notification</h3>

      <button
        onClick={() => {
          dispatch(showNotification("Hello from Baselayer"));
        }}
        type="button"
      >
        Frontend-generated notification
      </button>
    </>
  );
}

export default ExampleFrontendNotification;
