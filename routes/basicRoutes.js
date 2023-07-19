const express = require('express')
const router = express.Router();
const  requiredAuth = require('../middleware/authMiddleware')

router.get('/', function (req, res) {
    res.render('home');
})

router.get('/swimming', requiredAuth, function (req, res) {
    res.render('swimming');
})

module.exports = router;