const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcryptjs")

// JWT SETUP
var JwtStrategy = require("passport-jwt").Strategy, ExtractJwt = require("passport-jwt").ExtractJwt
const JwtStrategyConfiguration = new JwtStrategy({jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: process.env.SECRET}, function (jwt_payload, done) {
    User.findOne({username: jwt_payload.username}, function(err, user) {
    if (err) {
      return done(err, false)
    }
    if(user) {
      return done(null, user)
    } else {
      return done(null, false)
    }

  })
})
// JWT SETUP DONE
module.exports = JwtStrategyConfiguration