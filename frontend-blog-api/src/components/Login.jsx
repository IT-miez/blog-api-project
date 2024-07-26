import "../index.css";
import "../styles/login.css";
import Navbar from "./Navbar";
import { useState } from "react";

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

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});




function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	function storeToken(token) {
		localStorage.setItem("auth_token", token);
	}

	function fetchUserData(event) {
		event.preventDefault();

		const fetchURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"



		fetch(
			`${fetchURL}/user/login`,
			{
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
				body: JSON.stringify({
					username,
					password,
				}),
			},
		)
			.then((response) => response.json())
			.then((data) => {
				if (data.token) {
					storeToken(data.token);
					window.location.href = "/";
				} else {
					// eslint-disable-next-line
					console.log("Error?");
				}
			})
			// eslint-disable-next-line
			.catch((error) => console.log(error));
	}

	return (
		<div className="login-container">
			<Navbar />

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
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						</Avatar>
						<Typography component="h1" variant="h5"> 
							Log in
						</Typography>
						<Box component="form"onSubmit={fetchUserData} noValidate sx={{ mt: 3 }}>
							<Grid container spacing={2}>
							<Grid item xs={12} sx={{color: "white"}}>
								<TextField
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
								<TextField
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
							</Grid>
							<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							>
							Log in
							</Button>
						</Box>
						</Box>
					</Container>
				</ThemeProvider>
		</div>
	);
}

export default Login;
