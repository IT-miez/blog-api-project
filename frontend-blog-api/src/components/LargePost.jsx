import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import CreateComment from './CreateComment';

import draftToHtml from 'draftjs-to-html'; // Import draftjs-to-html
import { EditorState, convertFromRaw } from 'draft-js';

import "../styles/largepost.css"
import "../styles/commentbox.css"


function LargePost() {
    const [postContent, setPostContent] = useState(null);
    const [commentList, setCommentList] = useState(null);

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
            // Perform your data fetching here (e.g., using fetch, axios, etc.)
            const response = await fetch("http://localhost:5000/post/"+post_id);
            const result = await response.json();
            const response2 = await fetch("http://localhost:5000/comment/"+post_id)
            const result2 = await response2.json()
            
            // Update the state with the fetched data
            console.log("Result below:")
            console.log(result)
            console.log(result.post.content)
            console.log(typeof result.post.content)
            const parsedJson = await JSON.parse(result.post.content)
            console.log("Parsed JSON:")
            console.log(parsedJson)



            //let modifiedContent = await convertContentToHtml(parsedJson)
            let modifiedContent = draftToHtml(parsedJson)
            console.log('HTML Content:');
            console.log(modifiedContent);
            setPostContent(modifiedContent)

            console.log("Logging result2")
            console.log(result2)
            let juttu = result2
            setCommentList(juttu)
            
            /*
            setPostContent(newResult);
            */
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
        <CreateComment/>
        </div>
    </>
    )
}

export default LargePost
