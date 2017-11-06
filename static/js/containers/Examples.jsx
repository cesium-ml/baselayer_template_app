import { connect } from 'react-redux';

import * as API from 'baselayer/API';

import Examples from '../components/Examples';


const mapStateToProps = (state, ownProps) => (
  {
    results: state.examples.results
  }
);

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    compute: n => dispatch(
      API.POST('/example_compute', 'template_app/SEND_COMPUTE', { n })
    )
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Examples);
