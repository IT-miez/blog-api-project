import '../index.css'
import Navbar from "./Navbar"
import EditorComponent from "./EditorComponent"
import { useState } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


function CreatePost() {




    let [errorArray, setErrorArray] = useState([])
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    let [profileSummary, setProfileSummary] = useState("")

    function storeToken(token) {
        localStorage.setItem("auth_token", token);
    }

    function fetchUserData(event) {
        event.preventDefault()
        console.log("test user data")
        console.log(document.querySelector('input[name="username"]').value)
        console.log(document.querySelector('input[name="password"]').value)

        let givenUsername = document.querySelector('input[name="username"]').value
        let givenPassword = document.querySelector('input[name="password"]').value
        

        fetch("http://localhost:5000/post/create",
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
            console.log("LOGIN FETCH")
            if(data.token) {
                console.log(data.token)
                storeToken(data.token);
                console.log("LOGIN SUCCESSFUL")
                window.location.href="/posts";
            } else {
                console.log("NO TOKEN GIVEN")
                if(data.msg){
                    console.log(data.msg)
                }
                else if(data.message === "ok") {
                    console.log("successfull")
                    //window.location.href="/login.html";
                } 
                else {
                    console.log("Very strange error!")
                }
  
  
            }
  
        })
        .catch(error => console.log(error))
    }

    return (
    <div className="login-container">
        <Navbar></Navbar>
        <h1>Create Post</h1>
        <hr />
        <div >
        <form className="login-information"  onSubmit={fetchUserData}> 
        <div>
            <label>Title
                <input type="text" name="username" id="username" required/>
            </label>
        </div>
        <br></br>
        <div>
            <label>Text</label>
        <EditorComponent/>
        </div>
        <input type="submit"/>
        </form>
        </div>
        
    </div>
    );
}

export default CreatePost;