import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import CreateComment from './CreateComment';

import draftToHtml from 'draftjs-to-html'; // Import draftjs-to-html
import { EditorState, convertFromRaw } from 'draft-js';

import parseJwt from "../utils/parseJwt";

import "../styles/largepost.css"
import "../styles/commentbox.css"
import AuthorButtons from './AuthorButtons';


function LargePost() {
    const [postContent, setPostContent] = useState(null);
    const [commentList, setCommentList] = useState(null);
    const [postAuthor, setPostAuthor] = useState(null)
    const [dataFetched, setDataFetched] = useState(false);

    const authToken = localStorage.getItem("auth_token")
    let tokenInformation = ""
    if(authToken) {
      tokenInformation = parseJwt(authToken)
    }
    

    const location = useLocation();
    const pathnameParts = location.pathname.split('/');
    const post_id = pathnameParts[pathnameParts.length - 1];
    console.log("post id is: "+post_id)

    // Convert draftjs content to HTML
    // Convert draftjs content to HTML
    /*
    const convertContentToHtml = (rawContent) => {
        console.log('Raw content:');
        console.log(rawContent);
        if (!rawContent) return ''; // Return empty string if content is null or undefined
        
        // Convert raw content to ContentState
        const contentState = convertFromRaw({
            blocks: rawContent.blocks,
            entityMap: rawContent.entityMap || {},
        });
        console.log(contentState)
        // Create EditorState from ContentState
        const editorState = EditorState.createWithContent(contentState);
        console.log(editorState)
        // Convert EditorState to HTML using draftToHtml
        let convertedVersion = draftToHtml(editorState.getCurrentContent())
        console.log("Converted version:")
        console.log(convertedVersion)
        return convertedVersion;
      };
      */

    useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:5000/post/"+post_id);
            const result = await response.json();
            const response2 = await fetch("http://localhost:5000/comment/"+post_id)
            const result2 = await response2.json()
            
            const parsedJson = await JSON.parse(result.post.content)

            console.log("Author is: " +result.post.author)
            setPostAuthor(result.post.author)
            console.log("Current user is: "+tokenInformation.id)

            let modifiedContent = draftToHtml(parsedJson)
            setPostContent(modifiedContent)
            setDataFetched(true)
            let juttu = result2
            setCommentList(juttu)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData(); // Call the fetchData function

    }, []);

    return (
    <>
        <div>
        <Navbar></Navbar>
        <div className="largepost-outer-wrapper">
            {postContent === null ? (
                <p>Loading post...</p>
            ) : (
                <div className="largepost-wrapper" dangerouslySetInnerHTML={{ __html: postContent }} />
            )}
        </div>
        <div>
          {dataFetched && (
            <AuthorButtons
              currentUser={tokenInformation.id}
              postAuthor={postAuthor}
            />
          )}
        </div>
        <div className="comment-box-wrapper">   
        {commentList ? (
        commentList.length > 0 ? (
            commentList.map((item, index) => (
              <div key={index} className="comment-box">
                <h4>
                  {item.author.username}
                </h4>
                <p className="comment-content">
                  {item.commentContent}
                </p>
                <p>
                  {item.createdAtFormatted}
                </p>
              </div>
            
          ))
        ) : (
          <p>No items to display.</p>
        )
      ) : (
        <p>Loading comments...</p>
      )}
      </div>
        {tokenInformation && <CreateComment />}
        </div>
    </>
    )
}

export default LargePost
