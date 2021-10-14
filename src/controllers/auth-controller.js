const AuthService = require('../services/user-service')

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const user = {
        ...req.body
    }
    console.log(user)

    //Encryption
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(user.password, salt)

    //Change users password to hashed
    user.password = hashedPassword

    try {
        const createdUser = await AuthService.create(user)
        res.status(200).send(createdUser)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports = { register }