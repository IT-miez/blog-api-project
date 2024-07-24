import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ShortPost from "./ShortPost";
import "../styles/profile.css";
import "../styles/shortpost.css";

import parseJwt from "../utils/parseJwt";


const Profile = () => {
	const [profileData, setProfileData] = useState();
	const [userPosts, setUserPosts] = useState("");

	const fetchURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"

	useEffect(() => {
		const fetchData = async () => {
			const authToken = localStorage.getItem("auth_token");
			const tokenInformation = parseJwt(authToken);
			const userid = tokenInformation.id;

			try {
				const response = await fetch(`${fetchURL}/profile/${userid}`);
				const result = await response.json();
				console.log(result)
				setProfileData(result);
			} catch (error) {
				// eslint-disable-next-line
				console.error("Error fetching data:", error);
			}

			try {
				const allPosts = await fetch(`${fetchURL}/profile/${userid}/posts`);
				const allPostsResult = await allPosts.json();

				if (allPostsResult.length > 0) {
					setUserPosts(allPostsResult);
				} else {
					setUserPosts("No posts found. Post your first blog!");
				}
			} catch (error) {
				// eslint-disable-next-line
				console.error("Error fetching all posts of a user:", error);
			}
		};

		fetchData();
	}, []);

	function showPosts() {
		if (userPosts) {
			if (typeof userPosts === "string") {
				return <p>{userPosts}</p>;
			} if (userPosts.length > 0) {
				return (
					userPosts.map((item) => (
						<ShortPost
							key={crypto.randomUUID()}
							postId={item._id}
							title={item.title}
							creationDate={item.createdAtFormatted}
						/>
					))
				);
			}
			return <p>No posts available.</p>;
		}
		return null;
	}
	console.log(profileData)
	return (
		<div>
			<Navbar />
			{profileData ? (
				<div className="profile-container">
					<h1>{profileData.user.username}</h1>
					<div className="profile-inner-container">
						<h2>Bio:</h2>
						<p>{profileData.user.profileSummary}</p>
					</div>
					<div className="profile-inner-container">
						<p>
							Creation date:
							{profileData.user.createdAtFormatted}
						</p>
					</div>
				</div>
			) : (
				<div>
					<h2>Loading profile data....</h2>
				</div>
			)}
			{showPosts()}
		</div>
	);
};

export default Profile;
