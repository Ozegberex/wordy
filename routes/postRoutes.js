const express = require('express');
//creating the router
const postRouter = express.Router();
const postController = require('../controllers/postController');

//new_post
postRouter.get('/new_post', postController.get_new_Post_form);
//publish new_post
postRouter.post('/new_post', postController.publish_new_post);
// retrieve single post
postRouter.get('/read/:id', postController.get_single_post);
// updating a post by user
postRouter.get('/update_post/:id', postController.get_update_post_form);

postRouter.post('/update_post/:id', postController.update_single_post);
// deleting a single post
postRouter.delete('/delete_post/:id', postController.delete_single_post);
// exporting our postRouter
module.exports = { postRouter };