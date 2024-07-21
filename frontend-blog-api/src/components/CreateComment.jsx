import "../styles/createcomment.css";
import { useState } from "react";
import { useParams } from "react-router-dom";

import parseJwt from "../utils/parseJwt";


function CreateComment() {
	const { postid } = useParams();
	const [commentData, setCommentData] = useState("");

	const authToken = localStorage.getItem("auth_token");
	const tokenInformation = parseJwt(authToken);

	const fetchURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"

	function sendComment(event) {
		event.preventDefault();

		fetch(
			`${fetchURL}/comment/create`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authToken}`,
				},
				body: JSON.stringify({
					author: tokenInformation.id,
					post: postid,
					comment: commentData,
				}),
			},
		)
			.then((response) => response.json())
			.then((data) => {
				// TODO: Check status code and notify user if unsuccessful, refresh page if successful
			})
			// eslint-disable-next-line
			.catch((error) => console.log(error));
	}

	return (
		<div className="comment-container">
			<div>
				<form className="comment-form" onSubmit={sendComment}>
					<div>
						<label htmlFor="comment">Add comment</label>
						<br />
						<textarea type="text" name="comment" id="comment" required value={commentData} onChange={(event) => (setCommentData(event.target.value))} />

					</div>
					<br />
					<input type="submit" />
				</form>
			</div>

		</div>
	);
}

export default CreateComment;
