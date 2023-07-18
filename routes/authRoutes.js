const express = require('express')
const router = express.Router();
const requiredAuth = require('../middleware/authMiddleware')
const authController = require('../controllers/authController')

router.get('/', function (req, res) {
    res.render('home');
})

router.get('/swimming', requiredAuth, function (req, res) {
    res.render('swimming');
})


router.get('/signup', authController.signup_get)
router.get('/login', authController.login_get)

router.post('/signup', authController.signup_post)
router.post('/login', authController.login_post)

router.get('/logout', authController.logoutGet)

module.exports = router;
