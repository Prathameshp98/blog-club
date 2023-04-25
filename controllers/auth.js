
exports.getSignUp = (req, res, next) => {

    res.render('auth/signup', {})

}

exports.getLogIn = (req, res, next) => {

    res.render('auth/login', {})

}