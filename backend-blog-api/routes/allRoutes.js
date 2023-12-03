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
// Find user informatin route
router.get("/user/:userid", user_controller.user_profile);

router.get("/post/get", post_controller.post_get_post);
router.get("/post/test", post_controller.post_test);

router.get("/post/:postid", post_controller.get_post_content);


// POST routes
router.post("/post/create", post_controller.post_create_post);

module.exports = router;
