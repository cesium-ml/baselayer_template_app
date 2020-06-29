import React from 'react';
import PropTypes from 'prop-types';

const Profile = ({ username }) => (
  <div>
    <b>Username:</b>
    {' '}
    { username }
  </div>
);

Profile.propTypes = {
  username: PropTypes.string.isRequired
};

export default Profile;
