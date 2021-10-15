const Joi = require('joi');
const bcrypt = require('bcryptjs');
const UserService = require('../services/user-service')

const registerValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        password: Joi.string().min(8).required(),
        c_password: Joi.string().valid(Joi.ref('password')).required(),
        role: Joi.string()
    })
    return schema.validate(data)
}

const loginValidation = async (req, res, next) => {
    const user = await UserService.find({ email: req.body.email })
    if (!user) return res.status(401).send({ 'message': 'User or email doesnt exist' })

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(401).send({ 'message': 'User or email doesnt exist' })

    next()
}

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) return res.status(401).send({ 'message': 'Access Denied' })

    const onlyToken = token.split(' ')[1]

    jwt.verify(onlyToken, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).send({ 'message': 'Token is not valid' })
        req.user = user
        next()
    })
}

const checkRoleAdmin = async (req, res, next) => {
    if (req.user.role === 'admin') next()
    else res.status(403).send({ 'message': 'You are not allowed to do that' })
}

const checkRoleManager = async (req, res, next) => {
    if (req.user.role === 'manager' || req.user.role === 'admin') next()
    else res.status(403).send({ 'message': 'You are not allowed to do that' })
}

const checkRoleEmployee = async (req, res, next) => {
    if (req.user.role === 'employee' || req.user.role === 'manager' || req.user.role === 'admin') next()
    else res.status(403).send({ 'message': 'You are not allowed to do that' })
}

module.exports = { registerValidation, loginValidation, verifyToken, checkRoleAdmin, checkRoleManager, checkRoleEmployee }