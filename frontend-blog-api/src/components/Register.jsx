import "../index.css";
import "../styles/register.css";
import { useState } from "react";
import { redirect } from "react-router-dom";
import Navbar from "./Navbar";

function Register() {
	const [errorArray, setErrorArray] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [profileSummary, setProfileSummary] = useState("");

	function fetchUserData(event) {
		event.preventDefault();

		fetch(
			"http://localhost:5000/user/register",
			{
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
				body: JSON.stringify({
					username,
					password,
					profileSummary,

				}),
			},
		)
			.then((response) => {
				if(response.status==200) {
					console.log("redirecting...")
					window.location.href = '/';
				}
				else {
					response = response.json()
				}
				
			})
			.then((data) => {
				// TODO: redirect user on success, error popup on unsuccess
			})
			// eslint-disable-next-line
			.catch((error) => console.log(error));
	}

	return (
		<div className="login-container">
			<Navbar />
			<div className="register-form">
				<h1>Register</h1>
				<hr />
				<div>
					<form className="login-information" onSubmit={fetchUserData}>
						<div>
							<label>Username</label>
							<input type="text" name="username" id="username" required value={username} onChange={(event) => { setUsername(event.target.value); }} />
						</div>
						<br />
						<div>
							<label>Password</label>
							<input type="text" name="password" id="password" required value={password} onChange={(event) => { setPassword(event.target.value); }} />
						</div>
						<br />
						<div>
							<label>Profile bio</label>
							<input type="textfield" name="profile_summary" id="profile_summary" value={profileSummary} onChange={(event) => { setProfileSummary(event.target.value); }} />
						</div>
						<input type="submit" className="submit-button" />
					</form>
					<div>
						{errorArray ? (
							<ul>
								{errorArray.map((element) => (
									<li key={crypto.randomUUID()}>{element.msg}</li>
								))}
							</ul>
						) : (
							<p />
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Register;
