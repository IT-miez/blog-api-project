const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const bcrypt = require('bcryptjs');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { hash } = require('bcryptjs');
require('dotenv').config();

const app = express();

// JWT SETUP
const JwtStrategy = require('passport-jwt').Strategy; const
  { ExtractJwt } = require('passport-jwt');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

// JWT SETUP DONE

// Passport settings done

// MongoDB SETUP
// Set up mongoose connection
const mongoose = require('mongoose');
const User = require('./models/user');

const allRoutesRouter = require('./routes/allRoutes');

const JwtStrategyConfiguration = require('./utils/passportSetup');

passport.use(JwtStrategyConfiguration);

mongoose.set('strictQuery', false);

async function main(mongoDB) {
  await mongoose.connect(mongoDB);
}

if (process.env.NODE_ENV !== 'Test') {
  const prodDB = process.env.productionDatabase;
  const mongoDB = process.env.MONGODB_URI || prodDB;
  // eslint-disable-next-line
  main(mongoDB).catch((err) => console.log(err));
  // MongoDB SETUP DONE
}
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', allRoutesRouter); // Add all routes

app.use(cors());

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // eslint-disable-next-line
  console.error(err);
  res.json(err.message);
});

module.exports = app;
