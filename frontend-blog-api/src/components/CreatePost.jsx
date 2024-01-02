import Navbar from "./Navbar"
import EditorComponent from "./EditorComponent"
import { useState } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";

import "../styles/createpost.css"

import parseJwt from "../utils/parseJwt";

function CreatePost() {
    let tokenInformation = ""
    const authToken = localStorage.getItem("auth_token")
    if(authToken) {
        tokenInformation = parseJwt(authToken)
    }
    

    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    let [errorArray, setErrorArray] = useState([])
    let [title, setTitle] = useState("")

    function storeToken(token) {
        localStorage.setItem("auth_token", token);
    }



    function onSubmit(event) {
        event.preventDefault()
        console.log()
        console.log(editorState.getCurrentContent().getPlainText())
    }

    function fetchPostCreationData(event) {
        event.preventDefault()
        let givenEditorState = editorState
        givenEditorState = convertToRaw(givenEditorState.getCurrentContent())
        console.log("Editor state sitsueissön")
        console.log(givenEditorState)
        

        fetch("http://localhost:5000/post/create",
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+authToken
            },
            method: "POST",
            body: JSON.stringify({
                author: tokenInformation.id,
                title: title,
                content: givenEditorState
            })
        })
        .then(response => response.json())
        .then((data) => {
            console.log("Post creation fetch result")
            if(data) {
                console.log(data)
                console.log("Response status is: "+data.status)
            } else {
                console.log("Post creation failed")
            }
  
        })
        .catch(error => console.log(error))
    }

    return (
    
    <div>
    {authToken ? (
      // Render something when JWT token exists
      <div>
        <Navbar></Navbar>
        <div className="login-container">
            <h1>Create Post</h1>
            <hr />
            <div >
            <form className="login-information"  onSubmit={fetchPostCreationData}>
            <div>
                <label>Title</label>
                <input type="text" name="username" id="username" required value={title} onChange={(event) => (setTitle(event.target.value))}/>
            </div>
            <br></br>
            <div>
                <label>Text</label>
            <EditorComponent editorState={editorState} setEditorState={setEditorState}/>
            </div>
            <input type="submit"/>
            </form>
            </div>
        </div>
        
    </div>
    ) : (
      <div>
        <Navbar></Navbar>
        <h2>Users who are not logged in cannot post</h2>
      </div>
    )}
  </div>
    
    );
}

export default CreatePost;