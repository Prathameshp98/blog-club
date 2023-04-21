const express = require('express')

const blogController = require('../controllers/blogs')

const router = express.Router()

router.get('/', blogController.getHome)

module.exports = router