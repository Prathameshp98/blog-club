
const Blog = require('../models/Blog')

exports.getHome = (req, res, next) => {

    res.render('blogs/home', {
        userName: req.session.user.name
    })
}

exports.getAddBlog = (req, res, next) => {
    let message = req.flash('error')
    if(message.length > 0){
        message = message[0]
    } else {
        message = null
    }

    res.render('blogs/add-page', {
        userName: req.session.user.name,
        errorMessage: message
    })

}

exports.postAddBlog = (req, res, next) => {
    const title = req.body.title
    const imageUrl = req.body.imageurl
    const content = req.body.content

    console.log(title, imageUrl, content)

    const blog = new Blog({
        title: title,
        content: content,
        imageUrl: imageUrl,
        author: req.session.user._id,
        is_published: true,
        likes: []
    })

    blog.save()
        .then(result => {
            console.log(result)
            return res.redirect('/')
        })
        .catch(err => {
            console.log(err._message)
            req.flash('error', err._message)
            return res.redirect('/add-blog')
        })

}