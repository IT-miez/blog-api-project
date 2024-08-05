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
import tokens from "../constants/tokens"
import { loginRequest } from "../api/userRequests";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});




function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	function storeToken(token) {
		localStorage.setItem(tokens.auth_token, token);
	}

	function fetchUserData(event) {
		event.preventDefault();

		loginRequest(username, password)
		.then(() => {window.location.href = "/";})
		.catch((error) => {console.log(error.message)})
	}
			

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
							Log in
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
				
		</div>
	);
}

export default Login;
