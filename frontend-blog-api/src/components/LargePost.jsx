import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import draftToHtml from 'draftjs-to-html';
import { Typography, useTheme } from '@mui/material';
import Navbar from './Navbar';
import CreateComment from './CreateComment';
import parseJwt from '../utils/parseJwt';
import { fetchURL } from '../constants/fetchURL';
import '../styles/largepost.css';
import '../styles/commentbox.css';
import AuthorButtons from './AuthorButtons';

const fetchPost = async (postId) => {
    const response = await fetch(`${fetchURL}/post/${postId}`);
    const result = await response.json();
    return {
        ...result.post,
        parsedContent: draftToHtml(JSON.parse(result.post.content)),
    };
};

const fetchComments = async (postId) => {
    const response = await fetch(`${fetchURL}/comment/${postId}`);
    return response.json();
};

function LargePost() {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const authToken = localStorage.getItem('auth_token');
    const tokenInformation = authToken ? parseJwt(authToken) : null;

    const location = useLocation();
    const postId = location.pathname.split('/').pop();

    const { data: post, isLoading: postLoading } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => fetchPost(postId),
    });

    const { data: commentList, isLoading: commentsLoading } = useQuery({
        queryKey: ['comments', postId],
        queryFn: () => fetchComments(postId),
    });

    return (
        <div>
            <Navbar />
            <div className="postpage-wrapper">
                <div className="largepost-outer-wrapper">
                    {postLoading ? (
                        <p>Loading post...</p>
                    ) : (
                        <div className="largepost-post">
                            <h1>{post.title}</h1>
                            <div
                                className="largepost-wrapper"
                                dangerouslySetInnerHTML={{
                                    __html: post.parsedContent,
                                }}
                            />
                        </div>
                    )}
                </div>
                <div>
                    {post && tokenInformation && (
                        <AuthorButtons
                            postId={postId}
                            currentUser={tokenInformation.id}
                            postAuthor={post.author}
                        />
                    )}
                </div>
                <div className="comment-box-wrapper">
                    {commentsLoading ? (
                        <p>Loading comments...</p>
                    ) : commentList?.length > 0 ? (
                        commentList.map((item) => (
                            <div key={item._id} className="comment-box-content">
                                <div className="comment-box">
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
                            No Comments Yet
                        </Typography>
                    )}
                </div>
                {tokenInformation && <CreateComment postId={postId} />}
            </div>
        </div>
    );
}

export default LargePost;
