import '../index.css'; // Import a CSS file to style the component
import { Link } from "react-router-dom";

const Navbar = () => {

  function logoutButton() {
    localStorage.removeItem("auth_token")
    window.location.href = "/"
  }

  //StackOverflow function for parsing JWT-tokens
  function parseJwt(token) {
    console.log("Parsing token...")
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  let button1 = <button></button>
  let button2 = <button></button>
  let information = ""
  let profile_button = ""

  const authToken = localStorage.getItem("auth_token")
  if(!authToken) {
    button1 = 
    <Link to="login">
    <button className="login-button">Log In</button>
    </Link>
    button2 = 
    <Link to="signup">
      <button className="signup-button">Sign Up</button>
    </Link>
  } 
  else {
    const tokenInformation = parseJwt(authToken)
    button1 = <button onClick={logoutButton}>Logout</button>
    button2 = ""
    information = <h2>Hello {tokenInformation.username}</h2>
    profile_button =
    <Link to="">
      <button className="profile-button">Profile</button>
    </Link>
  }


  return (
    <div>
      <div className="logo-div">
            <h1 className="logo">Blogsite</h1>
        </div>
      <div className="navbar">
        
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
