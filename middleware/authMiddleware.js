const jwt = require('jsonwebtoken');

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

module.exports = requiredAuth 