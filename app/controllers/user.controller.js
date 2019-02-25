import User from '../models/user.model';
import passport from 'passport';

const isLoggedIn = (req, res, next) => req.isAuthenticated();

const signup = (req, res) => {
  passport.authenticate('local-signup', {
    failureFlash: 'Oops. Something went wrong. Email and password don’t match.'
  });
};

const login = (req, res) => {
  passport.authenticate('local-login', {
    failureFlash: 'Oops. Something went wrong. Email and password don’t match.'
  });
};

const logout = (req, res) => {
  req.logout();
};

export default {
  login,
  signup,
  logout,
  isLoggedIn
};



