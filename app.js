const express = require('express');
const mongoose = require('mongoose');
const { Post } = require('./models/post');
const bodyParser = require('body-parser')
const { postRouter } = require('./routes/postRoutes');
const { mainRouter } = require('./routes/mainRoutes');
// instantiating the application
const app = express();
// setting the app default
app.set('view engine', 'ejs');
// setting the middlewares
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// connecting to the database
dbURI =
  'mongodb+srv://Rexuser:Rex2022@chidinma.8wn2e.mongodb.net/wordy?retryWrites=true&w=majority';

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(5000, () => {
      console.log('App is listening on port 5000...');
    });
  });
  // every thing related to CRUD posts is in routes/postRoutes
  app.use('/posts', postRouter);
    // everything related to home about and 404
    app.use(mainRouter);