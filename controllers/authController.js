const User = require('../models/User')
const JWT = require('jsonwebtoken')

const errorsHandler = (err) => {
    console.log(err.message, err.code);
    let errors = {
        email: '',
        password: '',
    }

    //incorect email
    if(err.message === 'Incorect email') {
        errors.email = "That email is not registered"
        //return errors
    }
    //incorect password
    if(err.message === 'Incorect password') {
        errors.password = "That password is incorect"
        //return errors
    }

    //duplicate error code
    if(err.code === 11000) {
        errors.email = "This user already exists"
        return errors
    }

    //validate rrors
    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }

    return errors;
}

maxAgeInSec = 3 * 60 * 60 * 24
const createToken = (id) => {
    return JWT.sign({ id }, 'nixy secret', {
        expiresIn: maxAgeInSec
    })
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const {email, password} = req.body
    
    try {
        const user = await User.create({
            email,
            password
        })

        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAgeInSec * 1000 })
        res.status(201).json({user: user._id})
    }
    catch(Err) {
        const errors = errorsHandler(Err);
        res.status(400).json({errors})
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)

        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAgeInSec * 1000 })

        res.status(200).json({user: user._id})
    }
    catch(error) {
        const errors = errorsHandler(error);
        res.status(400).json({ errors })
    }
    //res.send('user login');
}

module.exports.logoutGet = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}