const Post = require("../models/post");
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
