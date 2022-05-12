const express = require('express');
const mongoose = require('mongoose');
const { Post } = require('./models/post');
const bodyParser = require('body-parser')
const { postRouter } = require('./routes/postRoutes');
const { mainRouter } = require('./routes/mainRoutes');
const dotenv = require('dotenv').config();

// instantiating the application
const app = express();
const PORT = process.env.PORT || 5000;
// setting the app default
app.set('view engine', 'ejs');
// setting the middlewares
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// connecting to the database
dbURI = process.env.MONGO_URI;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}...`);
    });
  });
  // every thing related to CRUD posts is in routes/postRoutes
  app.use('/posts', postRouter);
    // everything related to home about and 404
    app.use(mainRouter);