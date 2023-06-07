
const Blog = require('../models/Blog')
const User = require('../models/User')

exports.getHome = (req, res, next) => {
    let isLastPage = false

    Blog
        .find()
        .sort([['createdAt', -1]])
        .then(blogs => {
            blogs.forEach((blog, index) => {
                User
                .findById(blog.author)
                .then(author => {    
                     
                    blog.author = author.name

                    if(index === blogs.length - 1){
                        if(blogs.length <= 5){
                            isLastPage = true
                        }
                        res.render('blogs/home', {
                            userName: req.session.user.name,
                            blogs: blogs.slice(0,5),
                            nextPage: 2,
                            isLastPage: isLastPage,
                            userId: req.session.user._id.toString()
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            })
            
        })
        .catch(err => {
            console.log(err)
        })
    
}

exports.postHome = (req, res, next) => {
    let count = req.body.page * 5
    let isLastPage = false

    Blog
        .find()
        .sort([['createdAt', -1]])
        .then(blogs => {
            blogs.forEach((blog, index) => {
                User
                .findById(blog.author)
                .then(author => {    
                       
                    blog.author = author.name 

                    if(index === blogs.length - 1){
                        if(count > blogs.length){
                            count = blogs.length
                            isLastPage = true
                        } 
                        res.render('blogs/home', {
                            userName: req.session.user.name,
                            blogs: blogs.slice(0, count),
                            nextPage: 2,
                            isLastPage: isLastPage,
                            userId: req.session.user._id.toString()
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            })
        })
        .catch(err => {
            console.log(err)
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

exports.getBlogByName = (req, res, next) => {
    const blogName = req.params.blogname

    Blog
        .find()
        .sort([['createdAt', -1]])
        .then(blogs => {
            blogs.forEach((blog, index) => {
                User
                .findById(blog.author)
                .then(author => {                        
                    blog.author = author.name

                    if(index === blogs.length - 1){
                        res.render('blogs/full-blog-page', {
                            userName: req.session.user.name,
                            blogs: blogs,
                            slug: blogName,
                            blogName: blogName.replaceAll('-', ' '),
                            userId: req.session.user._id.toString()
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            })      
        })
        .catch(err => {
            console.log(err)
        })
}

exports.postLikeBlog = (req, res, next) => {

    const blogId = req.params.blogId;
    const userId = req.session.user._id.toString()

    Blog
        .findById(blogId)
        .then(blog => {

            if(!blog.likes.includes(userId)){

                Blog
                    .findByIdAndUpdate(blogId, {$push: {"likes": userId}})
                    .then(updatedBlog => {
                        
                    })
                    .catch(err => {
                        console.log(err)        
                    })
            } else {

                Blog
                    .findByIdAndUpdate(blogId, {$pull: {"likes": userId}})
                    .then(updatedBlog => {
                        
                    })
                    .catch(err => {
                        console.log(err)        
                    })

            }

            return res.redirect(req.originalUrl)

        })
        .catch(err => {
            console.log(err)
        })

}

