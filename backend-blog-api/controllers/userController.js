const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const passport = require("passport")
const LocalStrategyConfiguration = require("../utils/passportSetup.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
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

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      profilePicture: "none",
      profileSummary: req.body.profileSummary,
    });

    
    const findUserByUsername = async (username, newUser) => {
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
            title: "Failed to create account",
            user: newUser,
            errors: errors.array(),
          });
        } else {
          // Data from form is valid. Save book.
          await newUser.save();
          //res.redirect(newUser.url);
          res.json({
            title: "Account created",
            user: newUser,
            errors: errors.array(),
          });
          }
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    findUserByUsername(req.body.username, user)
    
  }),
];

exports.user_login_post = [
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
  async (req, res, next) => {
    console.log("Login test")
    const user = await User.findOne({username: req.body.username})
      if(!user){
        return res.status(403).json({msg: "Invalid credentials"})
      } else {
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
          if(err) throw err
          if(isMatch) {
            const jwtPayload = {
              id: user._id,
              username: user.username
            }
            jwt.sign(
              jwtPayload,
              process.env.SECRET,
              {
                expiresIn: "1d"
              },
              (err, token) => {
                res.json({success: true, token, message:"ok"})
              }
            )

          }
          else {
            console.log("wrong password")
            res.status(400).send({msg: "Invalid credentials"})
          }
        })
      }
    
  }
  
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