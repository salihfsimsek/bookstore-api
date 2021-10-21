const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const dotenv = require('dotenv')

/////////Routes/////////
const AuthRouter = require('./src/routes/auth-route')
const UserRouter = require('./src/routes/user-route')
const CategoryRouter = require('./src/routes/category-route')
const AuthorRouter = require('./src/routes/author-route')
const BookRouter = require('./src/routes/book-route')
const PublisherRouter = require('./src/routes/publisher-route')
const CommentRouter = require('./src/routes/comment-route')
/////////Routes/////////

//Trigger db connection
require('./db')

//Environment configuration
dotenv.config()

app.use(bodyParser.json())

app.get('/', async (req, res) => {
    res.status(200).send({ 'message': 'Success' })
})

app.use('/api/auth', AuthRouter)
app.use('/api/user', UserRouter)
app.use('/api/category', CategoryRouter)
app.use('/api/author', AuthorRouter)
app.use('/api/book', BookRouter)
app.use('/api/publisher', PublisherRouter)
app.use('/api/comment', CommentRouter)

module.exports = app