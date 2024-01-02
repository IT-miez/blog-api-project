import '../index.css'
import "../styles/login.css"
import Navbar from "./Navbar"

function Login() {

    function storeToken(token) {
        localStorage.setItem("auth_token", token);
    }

    function fetchUserData(event) {
        event.preventDefault()

        let givenUsername = document.querySelector('input[name="username"]').value
        let givenPassword = document.querySelector('input[name="password"]').value
        

        fetch("http://localhost:5000/user/login",
        {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                username: givenUsername,
                password: givenPassword
            })
        })
        .then(response => response.json())
        .then((data) => {
            if(data.token) {
                storeToken(data.token);
                window.location.href="/";
            } else {
                console.log("Error?")
            }
  
        })
        .catch(error => console.log(error))
    }

    return (
    <div className="login-container">
        <Navbar></Navbar>

        <div className="login-form">
            <h1>Log In</h1>
            <hr />
            <div >
            <form className="login-information"  onSubmit={fetchUserData}>
            <div>
                <label>Username</label>
                    <input type="text" name="username" id="username" required/>
            </div>
            <br></br>
            <div>
                <label>Password</label>
            <input type="text" name="password" id="password" required/>
            
            </div>
            <input type="submit" className="submit-button"/>
            </form>
            </div>
        </div>
        
    </div>
    );
}

export default Login;