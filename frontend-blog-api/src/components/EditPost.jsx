import { useEffect, useState } from 'react';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import EditorComponent from './EditorComponent';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../styles/createpost.css';
import { fetchURL } from '../constants/fetchURL';
import '../styles/editpost.css';

import parseJwt from '../utils/parseJwt';

function EditPost() {
    const [editorState, setEditorState] = useState();
    // const [errorArray, setErrorArray] = useState([]);
    const [title, setTitle] = useState('');
    //setTitle(title);

    let tokenInformation = '';
    const authToken = localStorage.getItem('auth_token');
    if (authToken) {
        tokenInformation = parseJwt(authToken);
    }

    const location = useLocation();
    const pathnameParts = location.pathname.split('/');
    const postId = pathnameParts[pathnameParts.length - 2];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${fetchURL}/post/${postId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                    method: 'GET',
                });
                const data = await response.json();
                const contentState = convertFromRaw(
                    JSON.parse(data.post.content)
                );
                setTitle(data.post.title);
                setEditorState(EditorState.createWithContent(contentState));

                // Handle fetched data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    function fetchPostUpdate(event) {
        event.preventDefault();
        let givenEditorState = editorState;
        givenEditorState = convertToRaw(givenEditorState.getCurrentContent());

        fetch(`${fetchURL}/post/${postId}/update`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
            method: 'POST',
            body: JSON.stringify({
                author: tokenInformation.id,
                title,
                content: givenEditorState,
            }),
        })
            .then((response) => {
                if (response.status == 200) {
                    const currentUrl = window.location.href;
                    window.location.href = currentUrl.substring(
                        0,
                        currentUrl.lastIndexOf('/')
                    );
                } else {
                    response = response.json();
                }
            })
            .then((data) => {
                if (data) {
                    // TODO: check data
                    console.log(data);
                }
            })
            .catch((error) => console.log(error));
    }

    return (
        <div>
            {authToken ? (
                // Render something when JWT token exists
                <div>
                    <Navbar />
                    <div className="login-container">
                        <h1>Edit Post</h1>
                        <div>
                            <form
                                className="edipost-wrapper"
                                onSubmit={fetchPostUpdate}>
                                <br />
                                <div>
                                    <div className="title-div">
                                        <h1>{title}</h1>
                                    </div>

                                    <EditorComponent
                                        editorState={editorState}
                                        setEditorState={setEditorState}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    className="submit-button"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <Navbar />
                    <h2>Users who are not logged in cannot edit a post</h2>
                </div>
            )}
        </div>
    );
}

export default EditPost;
