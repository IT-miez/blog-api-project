import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchURL } from '../constants/fetchURL';
import parseJwt from '../utils/parseJwt';
import { Typography } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/createcomment.css';

function CreateComment({ postId }) {
    const [commentData, setCommentData] = useState('');
    const queryClient = useQueryClient();
    const authToken = localStorage.getItem('auth_token');
    const tokenInformation = parseJwt(authToken);

    const mutation = useMutation({
        mutationFn: async (newComment) => {
            const response = await fetch(`${fetchURL}/comment/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify(newComment),
            });
            if (!response.ok) {
                throw new Error('Failed to add comment');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', postId] });
            setCommentData('');
            toast.success('Comment added successfully!', {
                position: 'bottom-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                theme: 'dark',
            });
        },
        onError: () => {
            toast.error('Failed to add comment. Please try again.', {
                position: 'bottom-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                theme: 'dark',
            });
        },
    });

    function sendComment(event) {
        event.preventDefault();
        mutation.mutate({
            author: tokenInformation.id,
            post: postId,
            comment: commentData,
        });
    }

    return (
        <div className="comment-container">
            <form className="comment-form" onSubmit={sendComment}>
                <Typography
                    variant="h7"
                    sx={{
                        color: '#fff',
                        textAlign: 'center',
                        width: '100%',
                    }}>
                    Add a comment
                </Typography>
                <br />
                <textarea
                    type="text"
                    name="comment"
                    id="comment"
                    maxLength={420}
                    required
                    value={commentData}
                    onChange={(event) => setCommentData(event.target.value)}
                />
                <br />
                <input
                    type="submit"
                    className="submit-button"
                    disabled={mutation.isLoading}
                />
            </form>
            <ToastContainer />
        </div>
    );
}

export default CreateComment;
