import { useState, useEffect } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import Navbar from "./Navbar";
import EditorComponent from "./EditorComponent";
import { useLocation } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../styles/createpost.css";

import parseJwt from "../utils/parseJwt";

function EditPost() {
    const [editorState, setEditorState] = useState();
	const [errorArray, setErrorArray] = useState([]);
	const [title, setTitle] = useState("");

	const fetchURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"

	let tokenInformation = "";
	const authToken = localStorage.getItem("auth_token");
	if (authToken) {
		tokenInformation = parseJwt(authToken);
	}

    const location = useLocation();
	const pathnameParts = location.pathname.split("/");
	const postId = pathnameParts[pathnameParts.length - 2];

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(
                `${fetchURL}/post/${postId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                    method: "GET",
                },
            )
            const data = await response.json();
            let contentState = convertFromRaw(JSON.parse(data.post.content))
            
            setEditorState(EditorState.createWithContent(contentState))
            console.log(editorState)
            // Handle fetched data
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();

      }, []);

	function fetchPostUpdate(event) {
		event.preventDefault();
		let givenEditorState = editorState;
		givenEditorState = convertToRaw(givenEditorState.getCurrentContent());

		fetch(
			`${fetchURL}/post/${postId}/update`,
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
			.then((response) =>  {
				if(response.status==200) {
					console.log("redirecting...")
					const currentUrl = window.location.href;
					const trimmedUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/'));
					window.location.href = trimmedUrl;
				}
				else {
					response = response.json()
				}
			})
			.then((data) => {
				if (data) {
					// TODO: check data
					console.log(data)
				}
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
					<div className="login-container">
						<h1>Edit Post</h1>
						<div>
							<form className="edipost-wrapper" onSubmit={fetchPostUpdate}>
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
					<h2>Users who aren't logged in cannot edit a post</h2>
				</div>
			)}
		</div>

	);
}

export default EditPost;
