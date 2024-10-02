import "../index.css";
import "../styles/login.css";
import { useState, useEffect } from "react";
import { redirect } from "react-router-dom";
import Navbar from "./Navbar";
import SuccessNotification from "./SuccessNotification";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { registerRequest } from "../api/userRequests";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const darkTheme = createTheme({
	palette: {
	  mode: 'dark',
	},
  });
  

export function Register() {
	const [errorArray, setErrorArray] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [profileSummary, setProfileSummary] = useState("");
	const [isOpen, setOpen] = useState(false);
	const [isRefreshed, setRefresh] = useState(false)

	//const fetchURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"


	useEffect(() => {
		if (isRefreshed) {
			console.log("Redirecting...");
			window.location.href = '/login';
		}
	}, [isRefreshed]);

	
	function fetchUserData(event) {
		event.preventDefault();

		event.target.disabled = true;
		
		registerRequest(username, password, profileSummary)
		.then(() => {
			setOpen(true)
			setTimeout(() => {
				console.log("redirecting...")
				window.location.href = "/login";
			}, 2000)	
					
		})
		.catch((error) => {
			error = JSON.parse(error.request.response); 
			console.log(error.msg)
			for (let i = 0; i < error.errors.length; i++) {
				//console.log(error.errors[i].msg);
				toast(error.errors[i].msg, {
					position: "bottom-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: false,
					progress: undefined,
					theme: "dark",
					});
			}
		})
		/*
		fetch(
			`${fetchURL}/user/register`,
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
					setOpen(true)
					sleep(2000)
					
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
			*/
	}

	/*
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
			<SuccessNotification openingState={isOpen} setOpen={setOpen} setRefresh={setRefresh}/>
		</div>
*/

	return (
		<div className="login-container">
			<Navbar />
			<div className="login-wrapper">
				
				
				<ThemeProvider theme={darkTheme}>
					<Container component="main" maxWidth="xs">
						<Box
						sx={{
							marginTop: 8,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
						>
						<Avatar sx={{ m: 1, bgcolor: 'blue' }}  src="/veikkomo.png" />
						<Typography component="h1" variant="h5"> 
							Register
						</Typography>
						<Box component="form"onSubmit={fetchUserData} noValidate sx={{ mt: 3 }}>
							<Grid container spacing={2}>
							<Grid item xs={12} sx={{color: "white"}}>
								<TextField sx={{backgroundColor: "#242424"}}
								autoComplete="given-name"
								name="username"
								required
								fullWidth
								id="username"
								label="Username"
								value={username}
								onChange={(event) => { setUsername(event.target.value); }}
								autoFocus
								/>
							</Grid>
							<Grid sx={{color: "white"}} item xs={12}>
								<TextField sx={{backgroundColor: "#242424"}}
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="new-password"
								value={password}
								onChange={(event) => { setPassword(event.target.value); }}
								/>
							</Grid>
							<Grid sx={{color: "white"}} item xs={12}>
								<TextField sx={{backgroundColor: "#242424"}}
								required
								fullWidth
								name="profile-bio"
								label="Profile Bio"
								id="profile-bio"
								value={profileSummary}
								onChange={(event) => { setProfileSummary(event.target.value); }}
								/>
							</Grid>
							</Grid>
							<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							>
							Register
							</Button>
						</Box>
						</Box>
					</Container>
				</ThemeProvider>
				<ToastContainer />
				<SuccessNotification openingState={isOpen} setOpen={setOpen} setRefresh={setRefresh}/>
			</div>
		</div>
	);
}

export default Register