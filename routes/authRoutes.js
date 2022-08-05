const express = require('express');
//creating the router
const authRouter = express.Router();
const authController = require('../controllers/authController');

//new_post
authRouter.get('/register', authController.renderRegisterUser);
authRouter.post('/register', authController.registerUser);

module.exports = { authRouter };