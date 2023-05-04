

exports.getHome = (req, res, next) => {

    res.render('blogs/home', {
        userName: req.session.user.name
    })
}