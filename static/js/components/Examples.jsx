import React from 'react';
import PropTypes from 'prop-types';


class Examples extends React.Component {
  constructor(props) {
    super(props);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(event) {
    event.preventDefault();

    const { compute } = this.props;
    compute(this.n.value);
  }

  render() {
    const { results } = this.props;
    const resultItems = results.map((result, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <li key={index}>{result.join(", ")}</li>
    ));

    return (
      <div>
        <h3>Example of a long running computation.</h3>

        <form onSubmit={this._handleSubmit}>
          Calculate squares of &nbsp;
          <input
            type="text"
            defaultValue="5"
            size="2"
            ref={(n) => { this.n = n; }}
          />
          numbers. &nbsp;
          <input type="submit" value="Go!" />
        </form>

        <h4>Results</h4>
        <ul>{ resultItems }</ul>

      </div>
    );
  }
}

Examples.propTypes = {
  compute: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
};

export default Examples;
