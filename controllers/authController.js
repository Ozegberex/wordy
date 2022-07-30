const { User } = require('../models/user');

const registerUser = (req, res) => {
    return res.render('register');
};




module.exports = {
    registerUser,
};
