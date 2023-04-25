const express = require('express')

const authController = require('../controllers/auth')

const router = express.Router()

// /auth/signup
router.get('/signup', authController.getSignUp)

// /auth/login
router.get('/login', authController.getLogIn)

module.exports = router