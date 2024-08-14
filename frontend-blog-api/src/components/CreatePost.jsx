import { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import EditorComponent from "./EditorComponent";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../styles/createpost.css";


import parseJwt from "../utils/parseJwt";
import { Navigate } from "react-router-dom";



function CreatePost() {
	const navigate = useNavigate();

	const fetchURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"

	let tokenInformation = "";
	const authToken = localStorage.getItem("auth_token");
	if (authToken) {
		tokenInformation = parseJwt(authToken);
	}

	const [editorState, setEditorState] = useState(EditorState.createEmpty());

	const [errorArray, setErrorArray] = useState([]);
	const [title, setTitle] = useState("");

	function fetchPostCreationData(event) {
		event.preventDefault();
		let givenEditorState = editorState;
		givenEditorState = convertToRaw(givenEditorState.getCurrentContent());

		fetch(
			`${fetchURL}/post/create`,
			{
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
			},
		)
			.then((response) => response.json())
			.then(data => {
				console.log(data)
				navigate("/post/"+data.post._id)
			})
			// eslint-disable-next-line
			.catch((error) => console.log(error));
	}

	return (

		<div>
			{authToken ? (
			// Render something when JWT token exists
				<div>
					<Navbar />
					<div className="createpost-container">
						<h1>Create Post</h1>
						<hr />
						<div>
							<form className="login-information" onSubmit={fetchPostCreationData}>
								<div>
									<label>Title</label>
									<input type="text" name="username" id="username" required value={title} onChange={(event) => (setTitle(event.target.value))} />
								</div>
								<br />
								<div>
									<label>Text</label>
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
