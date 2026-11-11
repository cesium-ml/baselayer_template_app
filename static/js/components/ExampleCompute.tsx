import { type SubmitEvent, useState } from "react";

import * as API from "baselayer/API";

import { useAppDispatch, useAppSelector } from "../store";

function ExampleCompute() {
  const [number, setNumber] = useState("5");
  const dispatch = useAppDispatch();

  const { results } = useAppSelector((state) => state.examples);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    void dispatch(
      API.POST("/example_compute", "template_app/SEND_COMPUTE", { n: number }),
    );
  };

  const resultItems = results.map((result, index) => (
    // oxlint-disable-next-line react/no-array-index-key -- results are only appended
    <li key={index}>{result.join(", ")}</li>
  ));

  return (
    <section className="card">
      <h2>Long-running computation</h2>

      <p>
        Each square takes 2 seconds. The squares are calculated in parallel
        threads, so 5 squares also take about 2 seconds. The result comes back
        over the WebSocket. You can submit more than one computation at a time.
      </p>

      <form onSubmit={handleSubmit}>
        Calculate the squares of the first
        <input
          onChange={(e) => {
            setNumber(e.target.value);
          }}
          size={2}
          type="text"
          value={number}
        />
        numbers
        <input type="submit" value="Go!" />
      </form>

      {resultItems.length > 0 && <ul>{resultItems}</ul>}
    </section>
  );
}

export default ExampleCompute;
