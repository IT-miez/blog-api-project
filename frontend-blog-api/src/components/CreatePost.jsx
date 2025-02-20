import { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import EditorComponent from "./EditorComponent";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../styles/createpost.css";
import parseJwt from "../utils/parseJwt";
import { TextField, Typography, useTheme, Box } from "@mui/material";
import { fetchURL} from "../constants/fetchURL";

function CreatePost() {
	const navigate = useNavigate();
	const theme = useTheme();
	const isDarkMode = theme.palette.mode === "dark";

	let tokenInformation = "";
	const authToken = localStorage.getItem("auth_token");
	if (authToken) {
		tokenInformation = parseJwt(authToken);
	}

	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const [title, setTitle] = useState("");

	function fetchPostCreationData(event) {
		event.preventDefault();
		let givenEditorState = editorState;
		givenEditorState = convertToRaw(givenEditorState.getCurrentContent());

		fetch(`${fetchURL}/post/create`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authToken}`,
			},
			method: "POST",
			body: JSON.stringify({
				author: tokenInformation.id,
				title,
				content: givenEditorState,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				navigate("/post/" + data.post._id);
			})
			.catch((error) => console.log(error));
	}

	return (
		<div>
			{authToken ? (
				<div>
					<Navbar />
					<div className="createpost-container">
						<Box
							sx={{
								padding: 2,
								backgroundColor: isDarkMode ? "#222" : "#e0e0e0", // Lighter background for light mode
								borderRadius: 1,
								width: "95%",
							}}
						>
							<Typography
								variant="h4"
								sx={{
									color: isDarkMode ? "#fff" : "#000", // Explicit color setting
									textAlign: "center",
								}}
							>
								Create Post
							</Typography>
						</Box>
						<hr />
						<div>
							<form className="login-information" onSubmit={fetchPostCreationData}>
								<div>
									<TextField
										fullWidth
										variant="outlined"
										required
										value={title}
										onChange={(event) => setTitle(event.target.value)}
										sx={{
											backgroundColor: isDarkMode ? "#333" : "#f5f5f5",
											color: isDarkMode ? "#fff" : "#000",
											width: "95%",
										}}
										label="Title"
									/>
								</div>
								<br />
								<div>
									<Box sx={{ width: "98%", backgroundColor: "#333", padding: 1, borderRadius: 1 }}>
										<Typography
											variant="h6"
											sx={{ color: isDarkMode ? "#fff" : "#fff", textAlign: "center" }}
										>
											Editor
										</Typography>
									</Box>
									<EditorComponent editorState={editorState} setEditorState={setEditorState} />
								</div>

								<input type="submit" className="submit-button" />
							</form>
						</div>
					</div>
				</div>
			) : (
				<div>
					<Navbar />
					<h2>Users who are not logged in cannot post</h2>
				</div>
			)}
		</div>
	);
}

export default CreatePost;
