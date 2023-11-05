const User = require("../models/user");
const { body, validationResult } = require("express-validator");


const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  // Get details of user
  const users = await Promise.all([
    User.countDocuments({}).exec(),
  ]);

  res.json({
    title: "User controller test",
    user_count: users,
  });
});


// Handle book create on POST.
exports.user_create_post = [
  // Validate and sanitize fields.
  body("username", "Username must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must not be empty.")
    .trim()
    .isLength({ min: 4 })
    .escape(),
  body("profileSummary", "Profile summary must not be empty.")
    .trim()
    .isLength({ min: 5 })
    .escape(),
  // Process request after validation and sanitization.

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    console.log("TEST TEST")
    console.log(req.body)
    // Create a Book object with escaped and trimmed data.
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      profilePicture: "none",
      profileSummary: req.body.profileSummary,
    });

    const findUserByUsername = async (username) => {
      try {
        // Use findOne() to find a user by username
        const user = await User.findOne({ username: username });
    
        if (user) {
          console.log('User found:', user);
          res.json({response: "User already exists with that name", userUrl: user.url});
        } else {
          if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/error messages.

          res.json({
            title: "Account created",
            user: user,
            errors: errors.array(),
          });
        } else {
          // Data from form is valid. Save book.
          await user.save();
          res.redirect(user.url);
          }
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    findUserByUsername(req.body.username)
    
  }),
];

// Display details of user
exports.user_profile = asyncHandler(async (req, res, next) => {
  console.log(req.params)
  console.log("USER PROFILE TEST")
  const user = await User.findById(req.params.userid).exec();

  if(user) {
    res.json({
      title: user.username+" - profile",
      user: user
    });
  }
  else {
    res.json({
      message: "User not found"
    })
  }
});