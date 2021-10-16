const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const dotenv = require('dotenv')

/////////Routes/////////
const AuthRouter = require('./src/routes/auth-route')
const UserRouter = require('./src/routes/user-route')
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

module.exports = app