const AuthService = require('../services/user-service')

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken')

//Data validation
const { registerValidation } = require('../middlewares/auth-middleware')

const register = async (req, res) => {
    const user = {
        ...req.body
    }

    //When validation failed, we must return message to user
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send({ 'message': `${error.details[0].message}` })

    //Encryption
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(user.password, salt)

    //Change users password to hashed
    user.password = hashedPassword

    try {
        const createdUser = await AuthService.create(user)
        res.status(201).send(createdUser)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const login = async (req, res) => {

}

module.exports = { register }