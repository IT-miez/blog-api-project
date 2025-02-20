import '../index.css';
import '../styles/navbar.css';
import { Link } from 'react-router-dom';

import parseJwt from '../utils/parseJwt';

export const Navbar = () => {
    function logoutButton() {
        localStorage.removeItem('auth_token');
        window.location.href = '/';
    }

    let button1 = <button />;
    let button2 = <button />;
    let button3 = '';
    let createPostButton = '';
    let information = '';
    let profileButton = '';

    const authToken = localStorage.getItem('auth_token');
    if (!authToken) {
        button1 = (
            <Link to="/login">
                <button className="login-button">Log In</button>
            </Link>
        );
        button2 = (
            <Link to="/register">
                <button className="register-button">Register</button>
            </Link>
        );
    } else {
        const tokenInformation = parseJwt(authToken);
        button1 = <button onClick={logoutButton}>Logout</button>;
        button2 = '';
        information = (
            <div>
                <h2 className="username-hello">Hello,</h2>
                <p className="username-box">{tokenInformation.username}</p>
            </div>
        );
        profileButton = (
            <Link to={`/profile/${tokenInformation.id}`}>
                <button className="profile-button">Profile</button>
            </Link>
        );

        createPostButton = (
            <Link to="/post/create">
                <button className="profile-button buttons-black">
                    Create Post
                </button>
            </Link>
        );
    }

    if (!profileButton) {
        button3 = (
            <Link to="/">
                <button id="blogsite-button" className="blogsite-button">
                    Blogsite
                </button>
            </Link>
        );
    } else {
        button3 = (
            <Link to="/">
                <button id="blogsite-button" className="blogsite-button">
                    Blogsite
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
                            {button3}
                            {information}
                        </div>
                    </div>
                    <div className="middle-buttons">{createPostButton}</div>
                    <div className="buttons buttons-right">
                        {profileButton}
                        {button1}
                        {button2}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
