const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const authRoutes = require('./routes/auth')
const blogRoutes = require('./routes/blogs')

const app = express()

app.set('view engine','ejs')
app.set('views','views')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/auth', authRoutes)
app.use('/', blogRoutes)

mongoose.connect(
    'mongodb+srv://admin_prathamesh:fDBN9Jc3d45pPhUt@cluster0.hm590.mongodb.net/BlogClubDB?retryWrites=true&w=majority'
    )
    .then(result => {
        app.listen(8282, () => {
            console.log("App started on port 8282")
        });   
    })
    .catch(err => console.log(err))



