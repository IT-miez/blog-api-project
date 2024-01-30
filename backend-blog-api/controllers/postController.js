const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Comment = require('../models/comment');
const Post = require('../models/post');

// Create a blogpost
exports.post_create_post = asyncHandler(async (req, res, next) => {
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

// Get all posts
exports.post_get_post = [

  asyncHandler(async (req, res, next) => {
    try {
      // Fetch posts with specified fields
      const allPosts = await Post.find({})
        .populate('author', 'username') // Add fields you want for the author
        .select('author title createdAt').sort({ createdAt: 'desc' }); // Select the fields you want for the post
      res.status(200).json({
        posts: allPosts,
      });
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error fetching posts:', error);
      throw error;
    }
  }),
];

// Add comment to a post
exports.post_add_comment = asyncHandler(async (req, res, next) => {
  const comment = new Comment({
    author: req.body.author,
    post: req.body.post,
    commentContent: req.body.comment,
  });

  await comment.save();

  res.status(200).json({
    msg: 'Comment created',
    comment,
  });
});

exports.post_test = asyncHandler(async (req, res, next) => {
  res.status(200).send('Works');
});

// Display details of a post
exports.get_post_content = asyncHandler(async (req, res, next) => {
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
exports.get_comments_of_a_post = asyncHandler(async (req, res, next) => {
  const postId = req.params.postid;

  try {
    // Find all comments for the given post ID, sort them by createdAt
    const comments = await Comment.find({ post: postId }).sort({ createdAt: 'asc' }).populate('author');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a post based on id
// Delete all comments related to that post
exports.delete_post = asyncHandler(async (req, res, next) => {
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
  
      res.status(200).json({ message: 'Post and associated comments deleted successfully' });
    } else {
      res.status(401).json({ msg: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error deleting post and associated comments:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  
});
