const UserService = require('../services/user-service')

const jwt = require('jsonwebtoken')

//Helper
const { passwordToHash } = require('../scripts/utils/helper')

const register = async (req, res) => {
    const user = {
        ...req.body
    }

    //Change users password to hashed
    user.password = await passwordToHash(user.password)

    try {
        const createdUser = await UserService.create(user)
        res.status(201).send(createdUser)
    } catch (err) {
        if (err.code === 11000 && err.message.includes('email')) res.status(400).send({ message: 'Email already in use' })
        else if (err.code === 11000 && err.message.includes('phone')) res.status(400).send({ message: 'Phone number already in use' })
        else res.status(400).send({ message: err.message })
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