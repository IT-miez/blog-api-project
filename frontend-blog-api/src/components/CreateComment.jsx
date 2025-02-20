import "../styles/createcomment.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import parseJwt from "../utils/parseJwt";

import SuccessNotification from "./SuccessNotification";


function CreateComment() {
	const { postid } = useParams();
	const [commentData, setCommentData] = useState("");
	const [isOpen, setOpen] = useState(false);
	const [isRefreshed, setRefresh] = useState(false)

	const authToken = localStorage.getItem("auth_token");
	const tokenInformation = parseJwt(authToken);

	const fetchURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	useEffect(() => {
		if (isRefreshed) {
			console.log("Redirecting...");
			location.reload();
			//window.location.href = '/';
		}
	}, [isRefreshed]);


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
		.then((response) => {
			if(response.status==200) {
				setOpen(true)
				//window.location.href = '/';
			}
			else {
				response = response.json()
			}
			
		})
		.then((data) => {
			// TODO: redirect user on success, error popup on unsuccess
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
						<textarea type="text" name="comment" id="comment" maxLength={420} required value={commentData} onChange={(event) => (setCommentData(event.target.value))} />

					</div>
					<br />
					<input type="submit" className="submit-button" />
				</form>
			</div>
			<SuccessNotification openingState={isOpen} setOpen={setOpen} setRefresh={setRefresh} title={"Comment added!"}/>
		</div>
	);
}

export default CreateComment;
