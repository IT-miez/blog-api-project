import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ShortPost from "./ShortPost";
import "../styles/profile.css";
import "../styles/shortpost.css";
import { fetchURL } from "../constants/fetchURL.js";
import parseJwt from "../utils/parseJwt";
import { profilePostsRequest, profileRequest } from "../api/profileRequests";

export const Profile = () => {
	const [profileData, setProfileData] = useState();
	const [userPosts, setUserPosts] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const authToken = localStorage.getItem("auth_token");
			const tokenInformation = parseJwt(authToken);
			const userid = tokenInformation.id;

			try {
				const response = await profileRequest(userid);
				setProfileData(response);
			} catch (error) {
				// eslint-disable-next-line
				console.error("Error fetching data:", error);
			}

			try {
				const allPostsResult = await profilePostsRequest(userid);

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
					<div className="profile-your-posts-container">
						{userPosts.map((item) => (
							<ShortPost
								key={crypto.randomUUID()}
								postId={item._id}
								title={item.title}
								creationDate={item.createdAtFormatted}
							/>
						))}
					</div>
				);
			}
			return <p>No posts available.</p>;
		}
		return null;
	}

	return (
		<div>
			<Navbar />
			{profileData ? (
				<div className="profile-container">
					<h1>{profileData.user.username}</h1>
					<div className="profile-bio-container">
						<h2>Bio:</h2>
						<p>{profileData.user.profileSummary}</p>
					</div>
					<div className="profile-inner-container profile-inner-container-creationdate">
						<p className="profile-text">
							Creation date:
						</p>
						<p className="profile-text">
							{profileData.user.creationDateFormatted}
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
