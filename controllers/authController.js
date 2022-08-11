const { User } = require('../models/user');
const helpers = require('../utils/auth');
const renderRegisterUser = (req, res) => {
    return res.render('register');
};
const registerUser = async (req, res) => {
    try {
        const body = req.body;
        if ( !body.firstName || !body.lastName ||!body.email ||!body.password ) {
            //sending an error message
            req.flash('error', 'Please provide all neccessary information')

            //please provide all information

            return res.status(400).redirect('/auth/register');

        };
        
body.password = helpers.generatePasswordHash(body.password);
body.email = body.email.tolowerCase();

const isExisting = await User.findOne({ email: body.email });
if (isExisting) {
    // send an error message of email duplicate
    req.flash('error', 'Email is already in use')

    // that email is already in use
    return res.status(400).redirect('/auth/register');
}

 await new User(body).save();
// sending a success message
req.flash('success', 'Registration successful, Please sign in')
// registration successful please sign in

        return res.status(201).redirect('/auth/login');
    } catch (error) {
        //sending an failed message
        req.flash('error', 'Something went wrong')

        // something went wrong
        return res.status(500).redirect('/auth/register');
    }
}

const renderLoginUser = (req, res) => {
    return res.render('login');
};


module.exports = {
    renderRegisterUser,
    registerUser,
    renderLoginUser,
};
