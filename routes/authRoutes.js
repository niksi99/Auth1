const express = require('express')
const router = express.Router();
const authController = require('../controllers/authController')
const checkCurrentUser = require('../middleware/authMiddleware')


router.get('*', checkCurrentUser);


router.get('/signup', authController.signup_get)
router.get('/login', authController.login_get)

router.post('/signup', authController.signup_post)
router.post('/login', authController.login_post)

router.get('/logout', authController.logoutGet)

module.exports = router;
