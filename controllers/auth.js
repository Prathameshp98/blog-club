const User = require('../models/User')
const bcrypt = require('bcryptjs')

exports.getSignUp = (req, res, next) => {

    res.render('auth/signup', {})

}

exports.getLogIn = (req, res, next) => {

    res.render('auth/login', {})

}

exports.postLogin = (req, res, next) => {

    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const confirm_password = req.body.confirm_password

    if(password === confirm_password){
        User.findOne({email: email})
            .then(userFound => {
                if(userFound){
                    console.log("Are aee vedya, bc, bat ka grip....., user is already registered.")
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

    } else {
        console.log("Are aee vedya, bc, bat ka grip....., password same nhiye.")
        return res.redirect('/auth/signup')
    }

}