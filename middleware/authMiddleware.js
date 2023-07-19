const jwt = require('jsonwebtoken');
const User = require('../models/User')

const requiredAuth = (req, res, next) => {

    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, 'nixy secret', (err, decodedToken) => {
            if(err) {
                console.log(err.message)
                res.redirect('/login');
            }
            else {
                console.log(decodedToken)
                next();
            }
        })
    }
    else {
        res.redirect('/login');
    }
}

const checkCurrentUser = (req, res, next) => {
    const token = req.cookies.jwt;

    
    if (token) {
    jwt.verify(token, 'nixy secret', async (err, decodedToken) => {
        if (err) {
            let user = {
                email: ''
            }
            res.locals.user = user;
            next();
        } 
        else {
            let user = await User.findById(decodedToken.id);
            res.locals.user = user;
            next();
        }
        });
    } 
    else {
        let user = {
            email: ''
        }
        res.locals.user = user;
        next();
    }
}
   

module.exports = requiredAuth;
module.exports = checkCurrentUser; 