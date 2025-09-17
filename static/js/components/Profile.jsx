import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const { username } = useSelector((state) => state.profile);

  return (
    <div>
      <b>Username:</b> {username}
    </div>
  );
}

export default Profile;
