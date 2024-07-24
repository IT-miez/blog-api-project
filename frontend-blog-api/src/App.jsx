import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ShortPost from "./components/ShortPost";

// Testing Modal
import {Modal, ModalOverlay, DialogTrigger, Button as ModalButton, Dialog, Heading} from 'react-aria-components';

// Testing imports

function App() {

	const [posts, setPosts] = useState([]);

	const fetchURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`${fetchURL}/post/get`);
				console.log(`${fetchURL}/post/get`)
				const result = await response.json();
				console.log(result.posts)
				setPosts(result.posts);
			} catch (error) {
				// eslint-disable-next-line
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	if (posts.length === 0) {
		return (
			<div>
				<div>
					<Navbar />
				</div>
				<p>Loading posts...</p>
			</div>
			
		);
	}

	return (
		<>
			<div>
				<Navbar />
			</div>
			<div className="shortpost-outer-wrapper">
				{posts.length > 0 ? (
					posts.map((item) => (
						<ShortPost
							key={crypto.randomUUID()}
							postId={item._id}
							author={item.author.username}
							creationDate={item.createdAtFormatted}
							title={item.title}
						/>
					))
				) : (
					<p>No posts found.</p>
				)}
			</div>
		</>
	);
}

export default App;
