import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import draftToHtml from "draftjs-to-html"; // Import draftjs-to-html
// import { EditorState, convertFromRaw } from "draft-js";
import Navbar from "./Navbar";
import CreateComment from "./CreateComment";

import parseJwt from "../utils/parseJwt";

import "../styles/largepost.css";
import "../styles/commentbox.css";
import AuthorButtons from "./AuthorButtons";

function LargePost() {
	const [title, setTitle] = useState("");
	const [postContent, setPostContent] = useState(null);
	const [commentList, setCommentList] = useState(null);
	const [postAuthor, setPostAuthor] = useState(null);
	const [dataFetched, setDataFetched] = useState(false);

	const fetchURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"

	const authToken = localStorage.getItem("auth_token");
	let tokenInformation = "";
	if (authToken) {
		tokenInformation = parseJwt(authToken);
	}

	const location = useLocation();
	const pathnameParts = location.pathname.split("/");
	const postId = pathnameParts[pathnameParts.length - 1];
	console.log(`${fetchURL}/post/${postId}`)
	console.log(`${fetchURL}/comment/${postId}`)

	// Convert draftjs content to HTML
	// Convert draftjs content to HTML
	/*
    const convertContentToHtml = (rawContent) => {
        console.log('Raw content:');
        console.log(rawContent);
        if (!rawContent) return ''; // Return empty string if content is null or undefined

        // Convert raw content to ContentState
        const contentState = convertFromRaw({
            blocks: rawContent.blocks,
            entityMap: rawContent.entityMap || {},
        });
        console.log(contentState)
        // Create EditorState from ContentState
        const editorState = EditorState.createWithContent(contentState);
        console.log(editorState)
        // Convert EditorState to HTML using draftToHtml
        let convertedVersion = draftToHtml(editorState.getCurrentContent())
        console.log("Converted version:")
        console.log(convertedVersion)
        return convertedVersion;
      };
      */

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`${fetchURL}/post/${postId}`);
				const result = await response.json();
				const response2 = await fetch(`${fetchURL}/comment/${postId}`);
				const result2 = await response2.json();

				const parsedJson = await JSON.parse(result.post.content);

				setPostAuthor(result.post.author);
				setTitle(result.post.title)
				const modifiedContent = draftToHtml(parsedJson);
				setPostContent(modifiedContent);
				setDataFetched(true);
				const juttu = result2;
				setCommentList(juttu);
			} catch (error) {
				// eslint-disable-next-line
				console.error("Error fetching data:", error);
			}
		};

		fetchData(); // Call the fetchData function
	}, []);

	return (
		<div>
			<Navbar />
			<div className="largepost-outer-wrapper">
				{postContent === null ? (
					<p>Loading post...</p>
				) : (
					<div>
						<h1>{title}</h1>
						<div className="largepost-wrapper" dangerouslySetInnerHTML={{ __html: postContent }} />
					</div>
					
				)}
			</div>
			<div>
				{dataFetched && (
					<AuthorButtons
						postId={postId}
						currentUser={tokenInformation.id}
						postAuthor={postAuthor}
					/>
				)}
			</div>
			<div className="comment-box-wrapper">
				{commentList ? (
					commentList.length > 0 ? (
						commentList.map((item) => (
							<div key={crypto.randomUUID()} className="comment-box">
								<h4>
									{item.author.username}
								</h4>
								<p className="comment-content">
									{item.commentContent}
								</p>
								<p>
									{item.createdAtFormatted}
								</p>
							</div>

						))
					) : (
						<p>No items to display.</p>
					)
				) : (
					<p>Loading comments...</p>
				)}
			</div>
			{tokenInformation && <CreateComment />}
		</div>
	);
}

export default LargePost;
