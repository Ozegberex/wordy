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
            //please provide all information

            return res.status(400).redirect('/auth/register');

        };
        
body.password = helpers.generatePasswordHash(body.password);
body.email = body.email.tolowerCase();

const isExisting = await User.findOne({ email: body.email });
if (isExisting) {
    // send an error message of email duplicate
    // that email is already in use
    return res.status(400).redirect('/auth/register');
}

 await new User(body).save();
// sending a success message
// registration successful please sign in

        return res.status(201).redirect('/auth/login');
    } catch (error) {
        //sending an failed message
        // something went wrong
        return res.status(500).redirect('/auth/register');
    }
}



module.exports = {
    renderRegisterUser,
    registerUser,
};
