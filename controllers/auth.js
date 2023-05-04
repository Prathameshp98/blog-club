const User = require('../models/User')
const bcrypt = require('bcryptjs')

exports.getSignUp = (req, res, next) => {
    let message = req.flash('error')
    if(message.length > 0){
        message = message[0]
    } else {
        message = null
    }

    if(!res.locals.isAuthenticated){
        res.render('auth/signup', {
            errorMessage: message
        })
    } else {
        res.redirect('/')
    }
    

}

exports.postSignUp = (req, res, next) => {

    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const confirm_password = req.body.confirm_password

    if(password !== confirm_password){
        req.flash('error', 'Password does not match.')
        return res.redirect('/auth/signup')
    }
    User.findOne({email: email})
        .then(userFound => {
            if(userFound){
                req.flash('error', 'E-Mail already registered, try different one.')
                return res.redirect('/auth/signup')
            }
            return bcrypt
                .hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        name: name,
                        email: email,
                        password: hashedPassword,
                        blogs: []
                    })
                    return user.save()
                })
                .then(result => {
                    res.redirect('/auth/login')
                })
        })
        .catch(err => { console.log(err) })


}

exports.getLogIn = (req, res, next) => {
    let message = req.flash('error')
    if(message.length > 0){
        message = message[0]
    } else {
        message = null
    }

    if(!res.locals.isAuthenticated){
        res.render('auth/login', {
            errorMessage: message
        })
    } else {
        res.redirect('/')
    }

}

exports.postLogin = (req, res, next) => {

    const email = req.body.email
    const password = req.body.password

    User.findOne({ email: email })
        .then(foundUser => {
            if(!foundUser) {
                req.flash('error', 'Invalid email or password.')
                return res.redirect('/auth/login')
            }
            bcrypt.compare(password, foundUser.password)
                .then(doMatch => {
                    if(doMatch){
                        req.session.isLoggedIn = true
                        req.session.user = foundUser
                        return req.session.save(err => {
                            if(err) { console.log(err) }
                            res.redirect('/')
                        })
                    }
                    req.flash('error', 'Invalid email or password.')
                    return res.redirect('/auth/login')
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('auth/login');
                });
        })
        .catch(err => console.log(err))

}


exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/auth/login')
    })

}