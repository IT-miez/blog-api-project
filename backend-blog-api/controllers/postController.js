const asyncHandler = require('express-async-handler');
// const { body, validationResult } = require('express-validator');
const Comment = require('../models/comment');
const Post = require('../models/post');

// Create a blogpost
module.exports.post_create_post = asyncHandler(async (req, res) => {
    const post = new Post({
        author: req.token.id,
        title: req.body.title,
        thumbnail: '',
        content: JSON.stringify(req.body.content),
    });

    await post.save();

    res.status(200).json({
        title: 'Post created',
        post,
    });
});

// Update a blogpost
module.exports.post_update_post = asyncHandler(async (req, res) => {
    const postId = req.params.postid;

    const post = await Post.findById(postId);

    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    if (post.author.toString() !== req.token.id) {
        return res
            .status(403)
            .json({ error: 'You are not authorized to update this post' });
    }

    post.content = JSON.stringify(req.body.content);

    await post.save();

    res.status(200).json({
        title: 'Post updated',
        post,
    });
});

// Get all posts
module.exports.post_get_post = [
    asyncHandler(async (req, res) => {
        try {
            // Fetch posts with specified fields
            const allPosts = await Post.find({})
                .populate('author', 'username') // Add fields you want for the author
                .select('author title createdAt')
                .sort({ createdAt: 'desc' }); // Select the fields you want for the post
            res.json({
                posts: allPosts,
            });
        } catch (error) {
             
            console.error('Error fetching posts:', error);
            throw error;
        }
    }),
];

// Add comment to a post
module.exports.post_add_comment = asyncHandler(async (req, res) => {
    const comment = new Comment({
        author: req.body.author,
        post: req.body.post,
        commentContent: req.body.comment,
    });

    if (!comment.author || !comment.post || !comment.commentContent) {
        return res
            .status(404)
            .json({ message: 'Missing author, post, or comment-content' });
    }

    await comment.save();

    res.status(200).json({
        msg: 'Comment created',
        comment,
    });
});

module.exports.post_test = asyncHandler(async (req, res) => {
    res.status(200).send('Works');
});

// Display details of a post
module.exports.get_post_content = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.postid).exec();

    if (post) {
        res.status(200).json({
            post,
        });
    } else {
        res.status(404).json({
            message: 'Post not found',
        });
    }
});

// Get all comments of a post
module.exports.get_comments_of_a_post = asyncHandler(async (req, res) => {
    const postId = req.params.postid;

    try {
        // Find all comments for the given post ID, sort them by createdAt
        const comments = await Comment.find({ post: postId })
            .sort({ createdAt: 'asc' })
            .populate('author');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Delete a post based on id
// Delete all comments related to that post
module.exports.delete_post = asyncHandler(async (req, res) => {
    const postId = req.params.postid;

    try {
        // Delete all comments of the post
        await Comment.deleteMany({ post: postId });

        // Delete the post
        const givenPost = await Post.findById(postId).select('author');

        if (!givenPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (req.token.id === givenPost.author.toString()) {
            const deletedPost = await Post.findByIdAndDelete(postId);

            if (!deletedPost) {
                return res.status(404).json({ message: 'Post not found' });
            }

            res.status(200).json({
                message: 'Post and associated comments deleted successfully',
            });
        } else {
            res.status(401).json({ msg: 'Unauthorized' });
        }
    } catch (error) {
         
        console.error('Error deleting post and associated comments:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
