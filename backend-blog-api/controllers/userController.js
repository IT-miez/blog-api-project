const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Post = require('../models/post');
const User = require('../models/user');

module.exports.index = asyncHandler(async (req, res) => {
    // Get details of user
    const users = await Promise.all([User.countDocuments({}).exec()]);

    res.json({
        title: 'User controller test',
        user_count: users,
    });
});

// Handle user create on POST.
module.exports.user_create_post = [
    // Validate and sanitize fields.
    body('username', 'Username must not be empty.')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    body('password')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long.')
        .matches(/[a-z]/)
        .withMessage('Password must contain at least one lowercase letter.')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter.')
        .matches(/[\W_]/)
        .withMessage('Password must contain at least one special character.')
        .escape(),

    body('profileSummary', 'Profile summary must not be empty.')
        .trim()
        .isLength({ min: 5 })
        .escape(),

    asyncHandler(async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(402).json({
                msg: 'Failed to create account',
                errors: errors.array(),
            });
        }

        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).json({
                response: 'User already exists with that name',
                errors: [{ msg: 'User already exists with that name' }],
            });
        }

        // If the user doesn't exist, proceed with user creation
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            profilePicture: 'none',
            profileSummary: req.body.profileSummary,
        });

        await user.save();

        return res.json({
            msg: 'Account created successfully',
        });
    }),
];


module.exports.user_login_post = [
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
    async (req, res) => {
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
module.exports.user_profile = asyncHandler(async (req, res) => {
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
module.exports.user_all_posts = asyncHandler(async (req, res) => {
    try {
        // Find all comments for the given post ID, sort them by createdAt
        const posts = await Post.find({ author: req.params.userid })
            .sort({ createdAt: -1 })
            .exec();
        res.status(200).json(posts);
    } catch (error) {
         
        console.error('Error fetching all posts of a user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
