import { useState } from "react";
import { useNavigate } from "react-router-dom";
import parseJwt from "../utils/parseJwt";


function AuthorButtons({
	postId, currentUser, postAuthor, onDelete, onEdit,
}) {
	// Check if currentUser and postAuthor are the same
	const isCurrentUserAuthor = currentUser === postAuthor;

	const navigate = useNavigate();

	const fetchURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"

	const authToken = localStorage.getItem("auth_token");
	const [confirmed, setConfirmed] = useState(false);
	const handleDelete = async () => {
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
		window.location.href = `/post/${postId}/edit`
	}

	// Render the buttons only if currentUser is the same as postAuthor
	return isCurrentUserAuthor ? (
		<div>
			<button onClick={handleDelete}>Delete</button>
			<button onClick={handleEdit}>Edit</button>
			{confirmed && <p>Post deleted successfully!</p>}
		</div>
	) : null;
}

export default AuthorButtons;
