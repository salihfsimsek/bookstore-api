const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const dotenv = require('dotenv')

//Trigger db connection
require('./db')

//Environment configuration
dotenv.config()

app.use(bodyParser.json())

app.get('/', async (req, res) => {
    res.status(200).send({ 'message': 'Success' })
})

module.exports = app