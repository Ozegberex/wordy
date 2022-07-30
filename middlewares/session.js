var session = require('express-session');
const MongoStore = require('connect-mongo');
const newSession = session({
  secret: 'rexsecret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
});

module.exports = { newSession };
