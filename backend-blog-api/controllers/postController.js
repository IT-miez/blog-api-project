const Post = require("../models/post");
const Comment = require("../models/comment")
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const { body, validationResult } = require("express-validator");

// Handle book create on POST.
exports.post_create_post = asyncHandler(async (req, res, next) => {
      console.log("Backend: Post Creation -route")
      console.log(req.body.content)

      const post = new Post({
      author: req.body.author,
      title: req.body.title,
      thumbnail: "",
      content: JSON.stringify(req.body.content)
      })

      console.log("Logging post..")
      console.log(post)
      await post.save()

      res.status(200).json({
        title: "Post created",
        post: post,
        errors: errors.array()
      })
    });

exports.post_get_post = [
  // Validate and sanitize fields.
 
  asyncHandler(async (req, res, next) => {
      console.log("test")
      console.log("Backend: Post Fetch -route")
      console.log(req.body)
      
      try {
        // Fetch posts with specified fields
        const allPosts = await Post.find({})
          .populate('author', 'username') // Add fields you want for the author
          .select('author title content createdAt'); // Select the fields you want for the post
        console.log(allPosts)

        res.status(200).json({
          posts: allPosts,
        })
      
      } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
      }
      
  })
];

// Add comment to a post
exports.post_add_comment = asyncHandler(async (req, res, next) => {
  console.log("Comment add -route")
  console.log(req.body)
  
  const comment = new Comment({
    author: req.body.author,
    post: req.body.post,
    commentContent: req.body.comment,
  })

  console.log("Creating comment..")
  console.log(comment)
  await comment.save()

  res.status(200).json({
    msg: "Comment created",
    comment: comment,
    errors: errors.array()
  })
    
});

exports.post_test = asyncHandler(async (req, res, next) => {
  console.log("test")
  res.status(200).send("Works")
})


// Display details of a post
exports.get_post_content = asyncHandler(async (req, res, next) => {
  console.log(req.params)
  console.log("Getting content of a blogpost...")
  const post = await Post.findById(req.params.postid).exec();

  if(post) {
    res.status(200).json({
      post: post,
    });
  }
  else {
    res.json({
      message: "Post not found"
    })
  }
});


// Get all comments of a post
exports.get_comments_of_a_post = asyncHandler(async (req, res, next) => {
  
  const postId = req.params.postid;
  console.log("Finding all comments...")

  try {
    // Find all comments for the given post ID, sort them by createdAt
    const comments = await Comment.find({ post: postId }).sort({ createdAt: 'asc' }).populate("author");
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});