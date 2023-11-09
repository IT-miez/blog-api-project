const express = require("express");
const router = express.Router();

// Requires for all controllers
const user_controller = require("../controllers/userController");

// ALL ROUTES
// GET home page.
router.get("/", user_controller.index);

// Create user with unique username -route
router.post("/user/register", user_controller.user_create_post);

router.post("/user/login", user_controller.user_login_post);

router.get("/user/:userid", user_controller.user_profile);

module.exports = router;
