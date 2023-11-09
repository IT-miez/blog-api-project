import '../index.css'
import Navbar from "./Navbar"

function Register() {


    function fetchUserData(event) {
        event.preventDefault()
        console.log("test user data")
        console.log(document.querySelector('input[name="username"]').value)
        console.log(document.querySelector('input[name="password"]').value)
        console.log(document.querySelector('input[name="profile-summary"]').value)

        let givenUsername = document.querySelector('input[name="username"]').value
        let givenPassword = document.querySelector('input[name="password"]').value
        let givenSummary = document.querySelector('input[name="profile-summary"]').value

        fetch("http://localhost:5000/user/register",
        {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                username: givenUsername,
                password: givenPassword,
                profileSummary: givenSummary

            })
        })
        .then(response => response.json())
        .then((data) => {
            console.log("REGISTER FETCH OUTPUT")
            console.log(data)
  
  
            
  
        })
        .catch(error => console.log(error))
    }

    return (
    <div className="login-container">
        <Navbar></Navbar>
        <h1>Log In</h1>
        <hr />
        <div >
        <form className="login-information"  onSubmit={fetchUserData}> 
        <div>
            <label>Username
                <input type="text" name="username" id="username" required/>
            </label>
        </div>
        <br></br>
        <div>
            <label>Password</label>
        <input type="text" name="password" id="password" required/>
        </div>
        <div>
            <label>Profile bio</label>
        <input type="textfield" name="profile-summary" id="profile-summary"/>
        </div>
        <input type="submit"/>
        </form>
        </div>
        
    </div>
    );
}

export default Register;