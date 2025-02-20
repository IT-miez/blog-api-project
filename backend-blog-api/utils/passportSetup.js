const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs');

// JWT SETUP
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const User = require('../models/user');

const JwtStrategyConfiguration = new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET,
    },
    async (jwtPayload, done) => {
        try {
            const user = await User.findOne({ username: jwtPayload.username });

            if (user) {
                return done(null, user);
            }
            return done(null, false);
        } catch (err) {
            return done(err, false);
        }
    }
);
// JWT SETUP DONE
module.exports = JwtStrategyConfiguration;
