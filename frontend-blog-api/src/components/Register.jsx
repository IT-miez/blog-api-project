import '../index.css'
import "../styles/register.css"
import Navbar from "./Navbar"
import { useState } from 'react'

function Register() {


    let [errorArray, setErrorArray] = useState([])
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    let [profileSummary, setProfileSummary] = useState("")

    function fetchUserData(event) {
        event.preventDefault()
        /*
        console.log(document.querySelector('input[name="username"]').value)
        console.log(document.querySelector('input[name="password"]').value)
        console.log(document.querySelector('input[name="profile-summary"]').value)

        let givenUsername = document.querySelector('input[name="username"]').value
        let givenPassword = document.querySelector('input[name="password"]').value
        let givenSummary = document.querySelector('input[name="profile-summary"]').value
        */

        fetch("http://localhost:5000/user/register",
        {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password,
                profileSummary: profileSummary

            })
        })
        .then(response => response.json())
        .then((data) => {
            if(data.errors) {
                setErrorArray(data.errors)
                for(let i = 0; i < errorArray.length; i++){
                    console.log(errorArray[i].msg)
                }
            }
  
            
            
  
        })
        .catch(error => console.log(error))
    }

    

    return (
    <div className="login-container">
        <Navbar></Navbar>
        <div className="register-form">
            <h1>Register</h1>
            <hr />
            <div >
            <form className="login-information"  onSubmit={fetchUserData}>
            <div>
                <label>Username</label>
                    <input type="text" name="username" id="username" required value={username} onChange={(event) => {setUsername(event.target.value)}}/>
            </div>
            <br></br>
            <div>
                <label>Password</label>
                    <input type="text" name="password" id="password" required value={password} onChange={(event) => {setPassword(event.target.value)}}/>
            </div>
            <br></br>
            <div>
                <label>Profile bio</label>
                    <input type="textfield" name="profile_summary" id="profile_summary" value={profileSummary} onChange={(event) => {setProfileSummary(event.target.value)}}/>
            </div>
            <input type="submit" className="submit-button"/>
            </form>
            <div>
            {errorArray ? (
                <ul>
                {errorArray.map((element, index) => (
                    <li key={index}>{element.msg}</li>
                ))}
                </ul>
                ) : (
                    <p></p>
                )}
                </div>
            </div>
        </div>
        
    </div>
    );
}

export default Register;