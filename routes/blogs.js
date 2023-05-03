const express = require('express')

const blogController = require('../controllers/blogs')
const isAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/', isAuth,  blogController.getHome)

module.exports = router