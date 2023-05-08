const express = require('express')

const blogController = require('../controllers/blogs')
const isAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/', isAuth,  blogController.getHome)

router.post('/', isAuth, blogController.postHome)

// /add-blog
router.get('/add-blog', isAuth,  blogController.getAddBlog)

// /add-blog
router.post('/add-blog', isAuth,  blogController.postAddBlog)

// /blog/:blogname
router.get('/blog/:blogname', isAuth, blogController.getBlogByName)

module.exports = router