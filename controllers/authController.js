const User = require('../models/User')
const JWT = require('jsonwebtoken')

const errorsHandler = (err) => {
    console.log(err.message, err.code);
    let errors = {
        email: '',
        password: '',
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
    res.send('user login');
}

module.exports.logout = (req, res) => {
    res.send('user logout');
}