const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcryptjs")

// JWT SETUP
var JwtStrategy = require("passport-jwt").Strategy, ExtractJwt = require("passport-jwt").ExtractJwt
const JwtStrategyConfiguration = new JwtStrategy({jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: process.env.SECRET}, async function (jwt_payload, done) {
    
  
  try {
    const user = await User.findOne({ username: jwt_payload.username });
  
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
})
// JWT SETUP DONE
module.exports = JwtStrategyConfiguration