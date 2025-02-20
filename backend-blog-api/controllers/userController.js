const { body, validationResult } = require('express-validator');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const LocalStrategyConfiguration = require('../utils/passportSetup');
const Post = require('../models/post');
const User = require('../models/user');

exports.index = asyncHandler(async (req, res, next) => {
    // Get details of user
    const users = await Promise.all([User.countDocuments({}).exec()]);

    res.json({
        title: 'User controller test',
        user_count: users,
    });
});

// Handle user create on POST.
exports.user_create_post = [
    // Validate and sanitize fields.
    body('username', 'Username must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('password', 'Password must not be empty.')
        .trim()
        .isLength({ min: 4 })
        .escape(),
    body('profileSummary', 'Profile summary must not be empty.')
        .trim()
        .isLength({ min: 5 })
        .escape(),
    // Process request after validation and sanitization.

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            profilePicture: 'none',
            profileSummary: req.body.profileSummary,
        });

        const findUserByUsername = async (username, newUser) => {
            try {
                // Use findOne() to find a user by username
                const user = await User.findOne({ username });

                if (user) {
                    res.status(400).json({
                        response: 'User already exists with that name',
                        userUrl: user.url,
                    });
                } else if (!errors.isEmpty()) {
                    // There are errors. Render form again with sanitized values/error messages.

                    res.status(402).json({
                        msg: 'Failed to create account',
                        errors: errors.array(),
                    });
                } else {
                    // Data from form is valid. Save book.
                    await newUser.save();
                    // res.redirect(newUser.url);
                    res.json({
                        msg: 'Account created',
                        errors: errors.array(),
                    });
                }
            } catch (error) {
                // eslint-disable-next-line
                console.error('Error:', error.message);
            }
        };
        findUserByUsername(req.body.username, user);
    }),
];

exports.user_login_post = [
    // Validate and sanitize fields.
    body('username', 'Username must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body('password', 'Password must be longer than 4 characters.')
        .trim()
        .isLength({ min: 4 })
        .escape(),
    body('profileSummary', 'Profile summary must be longer than 5 characters.')
        .trim()
        .isLength({ min: 5 })
        .escape(),
    // Process request after validation and sanitization.
    async (req, res, next) => {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(404).json({ msg: 'Invalid credentials' });
        }
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const jwtPayload = {
                    id: user._id,
                    username: user.username,
                };
                jwt.sign(
                    jwtPayload,
                    process.env.SECRET,
                    {
                        expiresIn: '1d',
                    },
                    (err, token) => {
                        res.status(200).json({
                            success: true,
                            token,
                            message: 'ok',
                        });
                    }
                );
            } else {
                res.status(400).send({ msg: 'Invalid credentials' });
            }
        });
    },
];

// Display details of user
exports.user_profile = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.userid).exec();

    if (user) {
        res.status(200).json({
            user,
        });
    } else {
        res.status(400).json({
            message: 'User not found',
        });
    }
});

// Get all posts of a user
exports.user_all_posts = asyncHandler(async (req, res, next) => {
    try {
        // Find all comments for the given post ID, sort them by createdAt
        const posts = await Post.find({ author: req.params.userid })
            .sort({ createdAt: -1 })
            .exec();
        res.status(200).json(posts);
    } catch (error) {
        // eslint-disable-next-line
        console.error('Error fetching all posts of a user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
