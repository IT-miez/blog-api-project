import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import draftToHtml from 'draftjs-to-html'; // Import draftjs-to-html
import { EditorState, convertFromRaw } from 'draft-js';

function LargePost() {
    const [postContent, setPostContent] = useState(null);

    const location = useLocation();
    const pathnameParts = location.pathname.split('/');
    const post_id = pathnameParts[pathnameParts.length - 1];
    console.log("post id is: "+post_id)

    // Convert draftjs content to HTML
    // Convert draftjs content to HTML
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

    useEffect(() => {
    const fetchData = async () => {
        try {
            // Perform your data fetching here (e.g., using fetch, axios, etc.)
            const response = await fetch("http://localhost:5000/post/"+post_id);
            const result = await response.json();
            
            // Update the state with the fetched data
            console.log("Result below:")
            console.log(result)
            console.log(result.post.content)
            console.log(typeof result.post.content)
            const parsedJson = await JSON.parse(result.post.content)
            console.log("Parsed JSON:")
            console.log(parsedJson)



            let modifiedContent = await convertContentToHtml(parsedJson)
            console.log('HTML Content:');
            console.log(modifiedContent);
            setPostContent(modifiedContent)
            
            
            
            /*
            setPostContent(newResult);
            */
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData(); // Call the fetchData function

    });

    return (
    <>
        <div>
        <Navbar></Navbar>
        <div>
            {postContent === null ? (
                <p>Loading post...</p>
            ) : (
                <div dangerouslySetInnerHTML={{ __html: postContent }} />
            )}
        </div>
        </div>
    </>
    )
}

export default LargePost
