import { useParams } from "react-router-dom";
import DefaultProfile from "./DefaultProfile";

const Profile = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Hello from profile page!</h1>
      <p>So, how are you?</p>
      <hr />
      <h2>The profile visited is here:</h2>
      {id === "popeye" ? (
        <h1>Test</h1>
      ) : (
        <DefaultProfile />
      )}
    </div>
  );
};

export default Profile;