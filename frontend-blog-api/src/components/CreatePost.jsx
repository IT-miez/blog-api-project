import '../index.css'
import Navbar from "./Navbar"
import EditorComponent from "./EditorComponent"
import { useState } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";

function CreatePost() {

    const authToken = localStorage.getItem("auth_token")
    const tokenInformation = parseJwt(authToken)
    console.log(tokenInformation.id)

    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    let [errorArray, setErrorArray] = useState([])
    let [title, setTitle] = useState("")

    function storeToken(token) {
        localStorage.setItem("auth_token", token);
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
                "Content-Type": "application/json"
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
                //window.location.href="/posts";
            } else {
                console.log("Post creation failed")
                if(data.msg){
                    console.log(data.msg)
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
        <form className="login-information"  onSubmit={fetchPostCreationData}> 
        <div>
            <label>Title
                <input type="text" name="username" id="username" required value={title} onChange={(event) => (setTitle(event.target.value))}/>
            </label>
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
    );
}

export default CreatePost;