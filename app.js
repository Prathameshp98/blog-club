const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)

const authRoutes = require('./routes/auth')
const blogRoutes = require('./routes/blogs')

dotenv.config()

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_DATABASE_USER}:${process.env.MONGO_DATABASE_PASSWORD}@${process.env.MONGO_DATABASE_CLUSTER}/${process.env.MONGO_DATABASE_NAME}`
console.log(MONGODB_URI)

const app = express()
const store = new MongoDBStore(
    {
        uri: MONGODB_URI,
        collection: 'sessions',
    },
    function(err){
        if(err){
            console.log(err)
        }
        
    }
)

app.set('view engine','ejs')
app.set('views','views')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(
    session({
            secret: 'my secret',
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
            },
            resave: false,
            saveUninitialized: false,
            store: store 
        })
)

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/auth', authRoutes)
app.use('/', blogRoutes)

mongoose.connect(
    MONGODB_URI + '?retryWrites=true&w=majority'
    )
    .then(result => {
        app.listen(8282, () => {
            console.log("App started on port 8282")
        });   
    })
    .catch(err => console.log(err))



