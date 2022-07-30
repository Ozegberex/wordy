const express = require('express');
//creating the router
const authRouter = express.Router();
const authController = require('../controllers/authController');

//new_post
authRouter.get('/registerUser', authController.registerUser);

module.exports = { authRouter };