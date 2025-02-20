import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import draftToHtml from 'draftjs-to-html'; // Import draftjs-to-html
// import { EditorState, convertFromRaw } from "draft-js";
import { Typography, useTheme } from '@mui/material';
import Navbar from './Navbar';
import CreateComment from './CreateComment';
import parseJwt from '../utils/parseJwt';
import { fetchURL } from '../constants/fetchURL';
import '../styles/largepost.css';
import '../styles/commentbox.css';
import AuthorButtons from './AuthorButtons';

function LargePost() {
    const [title, setTitle] = useState('');
    const [postContent, setPostContent] = useState(null);
    const [commentList, setCommentList] = useState(null);
    const [postAuthor, setPostAuthor] = useState(null);
    const [dataFetched, setDataFetched] = useState(false);
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const authToken = localStorage.getItem('auth_token');
    let tokenInformation = '';
    const [commentReRender, setCommentReRender] = useState(0);
    if (authToken) {
        tokenInformation = parseJwt(authToken);
    }

    const location = useLocation();
    const pathnameParts = location.pathname.split('/');
    const postId = pathnameParts[pathnameParts.length - 1];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${fetchURL}/post/${postId}`);
                const result = await response.json();
                const commentlistResponse = await fetch(
                    `${fetchURL}/comment/${postId}`
                );
                const commentlistJSON = await commentlistResponse.json();

                const parsedJson = await JSON.parse(result.post.content);

                setPostAuthor(result.post.author);
                setTitle(result.post.title);
                const modifiedContent = draftToHtml(parsedJson);
                setPostContent(modifiedContent);
                setDataFetched(true);
                setCommentList(commentlistJSON);
            } catch (error) {
                // eslint-disable-next-line
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the fetchData function
    }, [commentReRender]);
    return (
        <div>
            <Navbar />
            <div className="postpage-wrapper">
                <div className="largepost-outer-wrapper">
                    {postContent === null ? (
                        <p>Loading post...</p>
                    ) : (
                        <div className="largepost-post">
                            <h1>{title}</h1>
                            <div
                                className="largepost-wrapper"
                                dangerouslySetInnerHTML={{
                                    __html: postContent,
                                }}
                            />
                        </div>
                    )}
                </div>
                <div>
                    {dataFetched && (
                        <AuthorButtons
                            postId={postId}
                            currentUser={tokenInformation.id}
                            postAuthor={postAuthor}
                        />
                    )}
                </div>
                <div className="comment-box-wrapper">
                    {/* eslint-disable-next-line no-nested-ternary */}
                    {commentList ? (
                        commentList.length > 0 ? (
                            commentList.map((item) => (
                                <div className="comment-box-content">
                                    <div key={item._id} className="comment-box">
                                        <h4 className="comment-header">
                                            {item.author.username}
                                        </h4>
                                        <p className="comment-content">
                                            {item.commentContent}
                                        </p>
                                        <p>{item.createdAtFormatted}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Typography
                                variant="h6"
                                sx={{
                                    color: isDarkMode ? '#fff' : '#fff',
                                    textAlign: 'center',
                                    backgroundColor: '#333',
                                    width: '100%',
                                    paddingTop: '5px',
                                    paddingBottom: '5px',
                                }}>
                                Comments
                            </Typography>
                        )
                    ) : (
                        <p>Loading comments...</p>
                    )}
                </div>
                {tokenInformation && (
                    <CreateComment
                        commentReRender={commentReRender}
                        setCommentReRender={setCommentReRender}
                    />
                )}
            </div>
        </div>
    );
}

export default LargePost;
