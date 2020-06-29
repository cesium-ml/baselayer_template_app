import { connect } from 'react-redux';

import Profile from '../components/Profile';

const mapStateToProps = (state) => (
  state.profile
);

export default connect(mapStateToProps)(Profile);
