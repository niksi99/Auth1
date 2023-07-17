const express = require('express')
const router = express.Router();

const authController = require('../controllers/authController')

router.get('/', function (req, res) {
    res.render('home');
})

router.get('/signup', authController.signup_get)
router.get('/login', authController.login_get)

router.post('/signup', authController.signup_post)
router.post('/login', authController.login_post)

router.get('/logout', authController.logout)

module.exports = router;
