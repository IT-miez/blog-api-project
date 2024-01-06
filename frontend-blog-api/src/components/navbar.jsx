import "../index.css"; // Import a CSS file to style the component¨
import "../styles/navbar.css";
import { Link } from "react-router-dom";

import parseJwt from "../utils/parseJwt";

const Navbar = () => {
	function logoutButton() {
		localStorage.removeItem("auth_token");
		window.location.href = "/";
	}

	let button1 = <button />;
	let button2 = <button />;
	let button3 = "";
	let createPostButton = "";
	let information = "";
	let profileButton = "";

	const authToken = localStorage.getItem("auth_token");
	if (!authToken) {
		button1 =			(
			<Link to="/login">
				<button className="login-button">Log In</button>
			</Link>
		);
		button2 =			(
			<Link to="/register">
				<button className="register-button">Register</button>
			</Link>
		);
	} else {
		const tokenInformation = parseJwt(authToken);
		button1 = <button onClick={logoutButton}>Logout</button>;
		button2 = "";
		information = (
			<h2>
				Hello
				{tokenInformation.username}
			</h2>
		);
		profileButton =			(
			<Link to={`/profile/${tokenInformation.id}`}>
				<button className="profile-button">Profile</button>
			</Link>
		);

		createPostButton =			<Link to="/post/create"><button className="profile-button">Create Post</button></Link>;
	}

	button3 =		(
		<Link to="/">
			<button className="profile-button">Posts</button>
		</Link>
	);

	return (
		<div>
			<div className="logo-div">
				<h1 className="logo">Blogsite</h1>
			</div>
			<div className="navbar">
				{button3}
				<div className="container">
					<div>
						<div className="buttons">
							{information}
							{profileButton}
						</div>
					</div>
					<div>
						{createPostButton}
					</div>
					<div className="buttons">
						{button1}
						{button2}
					</div>

				</div>
			</div>
		</div>

	);
};

export default Navbar;
