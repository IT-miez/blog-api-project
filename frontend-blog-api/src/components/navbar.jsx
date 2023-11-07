import '../index.css'; // Import a CSS file to style the component
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <h1 className="logo">Blogsite</h1>
        <div>
          <div className="links">
            <Link to="profile">Profile page</Link>
          </div>
          <div className="buttons">

          <Link to="login">
            <button className="login-button">Log In</button>
          </Link>

          <Link to="signup">
            <button className="signup-button">Sign Up</button>
          </Link>
            
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Navbar;
