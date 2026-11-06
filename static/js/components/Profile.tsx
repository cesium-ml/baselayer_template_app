import { useAppSelector } from "../store";

function Profile() {
  const { username } = useAppSelector((state) => state.profile);

  return (
    <div>
      <b>Username:</b> {username}
    </div>
  );
}

export default Profile;
