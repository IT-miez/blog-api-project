import '../index.css';
import '../styles/navbar.css';
import { Link } from 'react-router-dom';
import parseJwt from '../utils/parseJwt';

export const Navbar = () => {
    function logoutButton() {
        localStorage.removeItem('auth_token');
        window.location.href = '/';
    }

    const authToken = localStorage.getItem('auth_token');

    let authButtons = null;
    let userButtons = null;
    let createPostButton = null;
    let information = null;

    if (!authToken) {
        authButtons = (
            <div className="buttons">
                <Link to="/login">
                    <button className="login-button">Log In</button>
                </Link>
                <Link to="/register">
                    <button className="register-button">Register</button>
                </Link>
            </div>
        );
    } else {
        const tokenInformation = parseJwt(authToken);

        information = (
            <div>
                <h2 className="username-hello">Hello,</h2>
                <p className="username-box">{tokenInformation.username}</p>
            </div>
        );

        userButtons = (
            <div className="buttons">
                <Link to={`/profile/${tokenInformation.id}`}>
                    <button className="profile-button">Profile</button>
                </Link>
                <button onClick={logoutButton} className="logout-button">
                    Logout
                </button>
            </div>
        );

        createPostButton = (
            <Link to="/post/create">
                <button className="profile-button buttons-black">
                    Create Post
                </button>
            </Link>
        );
    }

    return (
        <div>
            <div className="navbar">
                <div className="container">
                    <div className="buttons-left">
                        <div className="buttons buttons-left">
                            <Link to="/">
                                <button
                                    id="blogsite-button"
                                    className="blogsite-button">
                                    Blogsite
                                </button>
                            </Link>
                            {information}
                        </div>
                    </div>
                    <div className="middle-buttons">{createPostButton}</div>
                    <div className="buttons buttons-right">
                        {userButtons}
                        {authButtons}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
