import { useAppSelector } from "../store";

function Profile() {
  const { username } = useAppSelector((state) => state.profile);

  return <div>{username}</div>;
}

export default Profile;
