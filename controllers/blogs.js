

exports.getHome = (req, res, next) => {

    res.render('blogs/home', {
        userName: req.session.user.name
    })
}

exports.getAddBlog = (req, res, next) => {

    res.render('blogs/add-page', {
        userName: req.session.user.name
    })

}