import { useState } from "react";
import { useNavigate } from "react-router-dom";
import parseJwt from "../utils/parseJwt";

function AuthorButtons ({ postId, currentUser, postAuthor, onDelete, onEdit }) {
  // Check if currentUser and postAuthor are the same
  const isCurrentUserAuthor = currentUser === postAuthor;
  console.log("id of post is: "+postId)

  const navigate = useNavigate();

  const authToken = localStorage.getItem("auth_token")
  console.log(parseJwt(authToken))
  const [confirmed, setConfirmed] = useState(false);
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      // User confirmed deletion
      try {
        const response = await fetch(`http://localhost:5000/post/${postId}/delete`, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+authToken
        },

        });

        if (response.status == 200) {
          // Deletion successful
          setConfirmed(true);
          navigate("/");
          // Redirect to the desired route (e.g., '/')
        } else {
          // Handle error response
          console.error('Error deleting post:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  // Render the buttons only if currentUser is the same as postAuthor
  return isCurrentUserAuthor ? (
    <div>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={onEdit}>Edit</button>
      {confirmed && <p>Post deleted successfully!</p>}
    </div>
  ) : null;
}

export default AuthorButtons;
