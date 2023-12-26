import '../index.css'; // Import a CSS file to style the component¨
import "../styles/navbar.css"
import { Link } from "react-router-dom";

import parseJwt from "../utils/parseJwt";

const Navbar = () => {

  function logoutButton() {
    localStorage.removeItem("auth_token")
    window.location.href = "/"
  }


  let button1 = <button></button>
  let button2 = <button></button>
  let button3 = ""
  let information = ""
  let profile_button = ""

  const authToken = localStorage.getItem("auth_token")
  if(!authToken) {
    button1 = 
    <Link to="/login">
    <button className="login-button">Log In</button>
    </Link>
    button2 = 
    <Link to="/register">
      <button className="register-button">Register</button>
    </Link>
  } 
  else {
    const tokenInformation = parseJwt(authToken)
    console.log(tokenInformation)
    button1 = <button onClick={logoutButton}>Logout</button>
    button2 = ""
    information = <h2>Hello {tokenInformation.username}</h2>
    profile_button =
    <Link to={`/profile/${tokenInformation.id}`}>
      <button className="profile-button">Profile</button>
    </Link>
  }
  
  button3 = 
  <Link to="/">
  <button className="profile-button">Posts</button>
  </Link>

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
            {profile_button}
            </div>
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
