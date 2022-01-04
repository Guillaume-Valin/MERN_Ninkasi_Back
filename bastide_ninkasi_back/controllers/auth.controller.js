const userModel = require('../models/user.model');
const jwt = require ('jsonwebtoken');
const {signUpErrors, signInErrors} = require('../utils/errors.utils')

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, { expiresIn:maxAge})
};

module.exports.signUp = async (req, res) =>
{
    console.log(req.body)
    const {body} = req

    try
    {
        const user = await userModel.create(body);
        res.status(201).json({user: user._id});
    }
    catch(err)
    {
        const errors = signUpErrors(err);
        res.status(200).send({errors})
    }
}

module.exports.signIn = async (req, res) => {
    const {emailClient, passwordClient} = req.body

    try {
        const user = await userModel.login(emailClient, passwordClient);
        const token = createToken (user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge});
        res.status(200).json({user: user._id})
    }
    catch(err){
        const errors = signInErrors(err);
        res.status(200).send({errors})
    }
};

module.exports.logOut = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('./');
};