import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchURL } from "../constants/fetchURL";

function AuthorButtons({
	postId, currentUser, postAuthor,
}) {
	// Check if currentUser and postAuthor are the same
	const isCurrentUserAuthor = currentUser === postAuthor;

	const navigate = useNavigate();

	const authToken = localStorage.getItem("auth_token");
	const [confirmed, setConfirmed] = useState(false);
	const handleDelete = async () => {
		// eslint-disable-next-line no-alert
		if (window.confirm("Are you sure you want to delete this post?")) {
			// User confirmed deletion
			try {
				const response = await fetch(`${fetchURL}/post/${postId}/delete`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${authToken}`,
					},

				});

				if (response.status === 200) {
					// Deletion successful
					setConfirmed(true);
					navigate("/");
					// Redirect to the desired route (e.g., '/')
				}
			} catch (error) {
				// eslint-disable-next-line
				console.error("Error deleting post:", error);
			}
		}
	};

	function handleEdit() {
		window.location.href = `/post/${postId}/edit`;
	}

	// Render the buttons only if currentUser is the same as postAuthor
	return isCurrentUserAuthor ? (
		<div>
			<button className="author-button" onClick={handleDelete}>Delete</button>
			<button className="author-button" onClick={handleEdit}>Edit</button>
			{confirmed && <p>Post deleted successfully!</p>}
		</div>
	) : null;
}

export default AuthorButtons;
