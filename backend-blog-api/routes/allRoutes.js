const express = require('express');

const router = express.Router();

// Requires for all controllers
const passport = require('passport');
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const jwtExtract = require('../utils/extractJWTtoken');

// ALL ROUTES
// GET home page.
router.get('/', userController.index);

// User register route, Create user with unique username -route
router.post('/user/register', userController.user_create_post);

// User login route
router.post('/user/login', userController.user_login_post);

// Get profile information from logged in user
router.get('/profile/:userid', userController.user_profile);

// Get all posts of a user
router.get('/profile/:userid/posts', userController.user_all_posts);

// Get all posts with titles
router.get('/post/get', postController.post_get_post);

// Testroute
router.get('/post/test', postController.post_test);

// Get a singular post information
router.get('/post/:postid', postController.get_post_content);

// Get all comments of a post
router.get('/comment/:postid', postController.get_comments_of_a_post);

// * * POST routes * *
// * * POST routes * *
router.post('/post/create', jwtExtract, passport.authenticate('jwt', { session: false }), postController.post_create_post);

router.post('/post/:postid/update', jwtExtract, passport.authenticate('jwt', { session: false }), postController.post_update_post);

router.delete('/post/:postid/delete', jwtExtract, passport.authenticate('jwt', { session: false }), postController.delete_post);

router.post('/comment/create', jwtExtract, passport.authenticate('jwt', { session: false }), postController.post_add_comment);

module.exports = router;
