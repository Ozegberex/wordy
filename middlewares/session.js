var session = require('express-session');
const MongoStore = require('connect-mongo');
const newSession = session({
  secret: 'rexsecret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, maxAge: 24 * 60 * 60 * 1000 },
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
});

module.exports = { newSession };
