const LocalStrategy   = require('passport-local').Strategy;

import User from '../models/user';

const Strategy = {
  // by default, local strategy uses username and password, we will override with email
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
};

const signup = (req, email, password, done) => {
  // asynchronous
  // User.findOne wont fire unless data is sent back
  process.nextTick(() => {
    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    User.findOne({ 'local.email' :  email })
      .then((user) => {
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'))
        } else {
            const newUser = new User();

            newUser.local.email    = email;
            newUser.local.password = newUser.generateHash(password);

            // save the user
            newUser.save()
              .then((user) => done(null, user))
              .catch((err) => done(err));
        }
      })
      .catch((err) => done(err)); 
    });
};

const login = () => {
  User.findOne({ 'local.email' :  email })
    .then((user) => {
      if (!user) {
        return done(null, false, req.flash('loginMessage', 'No user found.'));
      }

      if (!user.validPassword(password)) {
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
      }

      return done(null, user);
    })
    .catch((err) => done(err));
};

export default (passport) => {
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => done(null, user))
      .catch((err) => done(err, null));
  });

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  passport.use('local-signup', new LocalStrategy(Strategy), signup);

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  passport.use('local-login', new LocalStrategy(Strategy),login);

};