const { User } = require('../models/user');

loginRequired = (req, res, next) => {
    if (req.session && req.session.user) {
      //find the user
      const user = User.findById(req.session.user._id);
      if (!user) {
        //if user not found
        req.flash('error', 'You need to sign in first')
          return res.redirect('/auth/login');
      }
      //if user found
      next();
    }
    // if user not in session
    req.flash('error', 'You need to sign in first')
          return res.redirect('/auth/login');
  };

  logoutRequired = (req, res, next) => {
    if (req.session && req.session.user) {
        //if user in session
          return res.redirect('/auth/dashboard/' + req.session.user._id);
      }
      //if user not in session
      return next();
  };
  
  module.exports = { loginRequired,
  logoutRequired };