import '../styles/createcomment.css'
import EditorComponent from "./EditorComponent"
import { useState } from 'react'
import { useParams } from 'react-router-dom';

import parseJwt from "../utils/parseJwt";

function CreateComment() {
    const { postid } = useParams();
    console.log("Post id is: "+postid)
    let [commentData, setCommentData] = useState("")

    

    const authToken = localStorage.getItem("auth_token")
    const tokenInformation = parseJwt(authToken)
    console.log(tokenInformation.id)


    function sendComment(event) {
        event.preventDefault()
        console.log(event.target.value)

        fetch("http://localhost:5000/comment/create",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+authToken
            },
            body: JSON.stringify({
                author: tokenInformation.id,
                post: postid,
                comment: commentData
            })
        })
        .then(response => response.json())
        .then((data) => {
            console.log("Comment adding fetch result")
            if(data) {
                console.log(data)
                //window.location.href="/posts";
            } else {
                console.log("Comment add failed")
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
    <div className="comment-container">
        <div >
            <form className="comment-form"  onSubmit={sendComment}> 
            <div>
                <label>Add comment</label><br></br>
                <textarea name="comment" id="comment" required value={commentData} onChange={(event) => (setCommentData(event.target.value))}/>
                
            </div>
            <br></br>
            <input type="submit"/>
            </form>
        </div>
        
    </div>
    );
}

export default CreateComment;