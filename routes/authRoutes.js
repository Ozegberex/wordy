const express = require('express');
//creating the router
const authRouter = express.Router();
const authController = require('../controllers/authController');
const { loginRequired, logoutRequired } = require('../middlewares/auth');
//new_post
authRouter.get('/register',logoutRequired, authController.renderRegisterUser);
authRouter.post('/register',logoutRequired,  authController.registerUser);
authRouter.get('/login', logoutRequired, authController.renderLoginUser);
authRouter.post('/login', logoutRequired, authController.loginUser);
authRouter.get(
    '/dashboard/:userId',
    loginRequired, 
    authController.renderDashboard
);
authRouter.get('/logout', loginRequired, authController.LogoutUser);

module.exports = { authRouter };