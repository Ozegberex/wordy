var session = require('express-session');
const MongoStore = require('connect-mongo');
const newSession = session({
  secret: 'rexsecret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
});


loginRequired = (req, res, next) => {
  if (req.session && req.session.user) {
    //find the user
    const user = User.findOneById(req.session.user._id);
    if (!user) {
      //if user not found
      req.flash('error', 'You need to sign in first')
        return res.status(400).redirect('/auth/login');
    }
    //if user found
    next();
  }
  // if user not in session
  req.flash('error', 'You need to sign in first')
        return res.status(400).redirect('/auth/login');
}

module.exports = { newSession };
