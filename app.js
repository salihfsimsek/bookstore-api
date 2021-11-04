const express = require('express')
const app = express()
const helmet = require('helmet')

//Config
const config = require('./src/configs/index')

//Loaders
const loaders = require('./src/loaders/index')

/////////Routes/////////
const {
    AuthRouter,
    UserRouter,
    CategoryRouter,
    AuthorRouter,
    BookRouter,
    PublisherRouter,
    CommentRouter,
    OrderRouter,
    AddressRouter
} = require('./src/routes/index')
/////////Routes/////////

config()
loaders()

//Trigger db connection
require('./src/loaders/db')

app.use(helmet())
app.use(express.json())

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
app.use('/api/order', OrderRouter)
app.use('/api/address', AddressRouter)

module.exports = app