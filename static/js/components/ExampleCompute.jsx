import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as API from "baselayer/API";

const ExampleCompute = () => {
  const [number, setNumber] = useState("5");
  const dispatch = useDispatch();

  const { results } = useSelector((state) => state.examples);

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      API.POST("/example_compute", "template_app/SEND_COMPUTE", { n: number })
    );
  };

  const resultItems = results.map((result, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <li key={index}>{result.join(", ")}</li>
  ));

  return (
    <div>
      <h3>Example of a long running computation.</h3>

      <p>
        We delay the computation artificially (2s per operation) to demonstrate
        long running computations. Since the computations happen in parallel,
        the total delay is around 3 or 4 seconds for squaring 5 numbers. Feel
        free to click the button a few times in succession!
      </p>

      <form onSubmit={handleSubmit}>
        Calculate squares of first &nbsp;
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          size="2"
        />
        &nbsp;numbers. &nbsp;
        <input type="submit" value="Go!" />
      </form>

      <h4>Results</h4>
      <ul>{resultItems}</ul>
    </div>
  );
};

export default ExampleCompute;
