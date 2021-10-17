const UserService = require('../services/user-service')

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken')

//Data validation
const { registerValidation } = require('../middlewares/auth-middleware');

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
        const createdUser = await UserService.create(user)
        res.status(201).send(createdUser)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const login = async (req, res) => {
    try {
        const user = await UserService.find({ email: req.body.email })
        user.lastSeen = Date.now()
        await user.save()
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.TOKEN_SECRET)
        res.status(200).send({ 'token': token, 'id': user._id, 'email': user.email, 'role': user.role })
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports = { register, login }