const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const dotenv = require('dotenv')

/////////Routes/////////
const AuthRouter = require('./src/routes/auth-route')
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

module.exports = app