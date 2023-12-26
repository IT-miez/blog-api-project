const express = require("express");
const router = express.Router();

// Requires for all controllers
const user_controller = require("../controllers/userController");
const post_controller = require("../controllers/postController");

// ALL ROUTES
// GET home page.
router.get("/", user_controller.index);

// User register route, Create user with unique username -route
router.post("/user/register", user_controller.user_create_post);


// User login route
router.post("/user/login", user_controller.user_login_post);

// Get profile information from logged in user
router.get("/profile/:userid",user_controller.user_profile)

// Get all posts of a user
router.get("/profile/:userid/posts", user_controller.user_all_posts)

// Get all posts with titles
router.get("/post/get", post_controller.post_get_post);


// Testroute
router.get("/post/test", post_controller.post_test);


// Get a singular post information
router.get("/post/:postid", post_controller.get_post_content);

// Get all comments of a post
router.get("/comment/:postid",post_controller.get_comments_of_a_post);


// * * POST routes * *
// * * POST routes * * 
router.post("/post/create", post_controller.post_create_post);

router.post("/comment/create", post_controller.post_add_comment);




module.exports = router;
