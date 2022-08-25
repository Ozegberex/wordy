const { User } = require('../models/user');
const helpers = require('../utils/auth');
const renderRegisterUser = (req, res) => {
    return res.render('register');
};
const registerUser = async (req, res) => {
    try {
        const body = req.body;
        if ( !body.firstName || !body.lastName || !body.email || !body.password ) {
            //sending an error message
            req.flash('error', 'Please provide all neccessary information')

            //please provide all information

            return res.status(400).redirect('/auth/register');

        };
        
body.password = helpers.generatePasswordHash(body.password);
body.email = body.email.toLowerCase();

const isExisting = await User.findOne({ email: body.email });
if (isExisting) {
    // send an error message of email duplicate
    req.flash('error', 'Email is already in use');
    return res.status(400).redirect('/auth/register');
}

 await new User(body).save();
// sending a success message
req.flash('success', 'Registration successful, Please sign in');
// registration successful please sign in

        return res.status(201).redirect('/auth/login');
    } catch (error) {
        console.log(error);
        //sending an failed message
        req.flash('error', 'Something went wrong');
        return res.status(500).redirect('/auth/register');
    }
};

const renderLoginUser = (req, res) => {
    return res.render('login');
};
const loginUser = async(req, res) => {
try {
    const body = req.body;
    if (!body.email || !body.password ) {
        //sending an error message
        req.flash('error', 'Please provide all neccessary information')
        //please provide all information
        return res.status(400).redirect('/auth/login');
    };
    //finding the user
    const user = await User.findOne({ email: body.email.toLowerCase() });
    // if user not found
    if (!user) {
        req.flash('error', 'Invalid email or password')
        return res.status(400).redirect('/auth/login');
    }
    //if user found
    //check password match
    const valid = helpers.validatePassword( body.password , user.password);
    if (!valid) {
        req.flash('error', 'Invalid email or password')
        return res.status(400).redirect('/auth/login');
    }
    //if password match 
    //create user into session
    req.session.user = user;
    //sending success message
    req.flash('success', 'Logged in successfully')
    return res.status(200).redirect(`/auth/dashboard/${user._id}`);
}   catch (error) {
    // sending failed message
    req.flash('error' , 'Something went wrong');
    return res.status(500).redirect('/auth/login');
}
};
const renderDashboard = ( req, res) => {
    return res.render('dashboard');
};

const LogoutUser = ( req, res) => {
    return req.session.destroy(() => {
        res.redirect('/auth/login');
    });
};

module.exports = {
    renderRegisterUser,
    registerUser,
    renderLoginUser,
    loginUser,
    renderDashboard,
    LogoutUser,
};
