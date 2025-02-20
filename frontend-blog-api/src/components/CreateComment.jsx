import "../styles/createcomment.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import parseJwt from "../utils/parseJwt";
import { fetchURL } from "../constants/fetchURL";
import { Typography, useTheme } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateComment({ commentReRender, setCommentReRender }) {
	const { postid } = useParams();
	const [commentData, setCommentData] = useState("");
	const theme = useTheme();
	const isDarkMode = theme.palette.mode === "dark";
	const authToken = localStorage.getItem("auth_token");
	const tokenInformation = parseJwt(authToken);

	function sendComment(event) {
		event.preventDefault();

		fetch(`${fetchURL}/comment/create`, {
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
		})
			.then((response) => {
				if (response.status === 200) {
					setCommentReRender(commentReRender + 1);
					setCommentData("");
					toast.success("Comment added successfully!", {
						position: "bottom-right",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: false,
						theme: "dark",
					});
				} else {
					return response.json().then((data) => {
						toast.error("Failed to add comment. Please try again.", {
							position: "bottom-right",
							autoClose: 3000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: false,
							theme: "dark",
						});
					});
				}
			})
			.catch((error) => {
				console.error(error);
				toast.error("An error occurred. Please try again later.", {
					position: "bottom-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: false,
					theme: "dark",
				});
			});
	}

	return (
		<div className="comment-container">
			<div>
				<form className="comment-form" onSubmit={sendComment}>
					<div>
						<Typography
							variant="h7"
							sx={{
								color: "#fff",
								textAlign: "center",
								width: "100%",
							}}
						>
							Add a comment
						</Typography>
						<br />
						<textarea
							type="text"
							name="comment"
							id="comment"
							maxLength={420}
							required
							value={commentData}
							onChange={(event) => setCommentData(event.target.value)}
						/>
					</div>
					<br />
					<input type="submit" className="submit-button" />
				</form>
			</div>
			<ToastContainer />
		</div>
	);
}

export default CreateComment;