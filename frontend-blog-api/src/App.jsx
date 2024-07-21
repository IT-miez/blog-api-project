import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ShortPost from "./components/ShortPost";

function App() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`https://blog-api-backend-g3af.onrender.com/post/get`);
				const result = await response.json();

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
				<p>No posts found.</p>
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
					<p>Loading posts...</p>
				)}
			</div>
		</>
	);
}

export default App;
