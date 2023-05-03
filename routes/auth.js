const express = require('express')

const authController = require('../controllers/auth')

const router = express.Router()

// /auth/signup
router.get('/signup', authController.getSignUp)

// /auth/signup
router.post('/signup', authController.postSignUp)

// /auth/login
router.get('/login', authController.getLogIn)

// /auth/login
router.post('/login', authController.postLogin)

// /auth/logout
router.post('/logout', authController.postLogout)


module.exports = router