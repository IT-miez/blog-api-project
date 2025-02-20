import '../index.css';
import '../styles/login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import { registerRequest } from '../api/userRequests';
import Navbar from './Navbar';
import 'react-toastify/dist/ReactToastify.css';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [profileSummary, setProfileSummary] = useState('');
    const navigate = useNavigate();

    function fetchUserData(event) {
        event.preventDefault();
        event.target.disabled = true;

        registerRequest(username, password, profileSummary)
            .then(() => {
                toast.success(
                    'Registration successful! Redirecting to login...',
                    {
                        position: 'bottom-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        theme: 'dark',
                    }
                );
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            })
            .catch((error) => {
                error = JSON.parse(error.request.response);
                error.errors.forEach((err) => {
                    toast.error(err.msg, {
                        position: 'bottom-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        theme: 'dark',
                    });
                });
            });
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
                            }}>
                            <Avatar
                                sx={{ m: 1, bgcolor: 'blue' }}
                                src="/veikkomo.png"
                            />
                            <Typography component="h1" variant="h5">
                                Register
                            </Typography>
                            <Box
                                component="form"
                                onSubmit={fetchUserData}
                                noValidate
                                sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Username"
                                            id="username"
                                            value={username}
                                            onChange={(event) =>
                                                setUsername(event.target.value)
                                            }
                                            required
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Password"
                                            type="password"
                                            id="password"
                                            value={password}
                                            onChange={(event) =>
                                                setPassword(event.target.value)
                                            }
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Profile Bio"
                                            id="profile-bio"
                                            value={profileSummary}
                                            onChange={(event) =>
                                                setProfileSummary(
                                                    event.target.value
                                                )
                                            }
                                            required
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}>
                                    Register
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Register;
