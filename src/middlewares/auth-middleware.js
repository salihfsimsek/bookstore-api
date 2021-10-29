const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const UserService = require('../services/user-service')


const loginMiddleware = async (req, res, next) => {
    const user = await UserService.find({ email: req.body.email })
    if (!user) return res.status(401).send({ 'message': "User or email doesn't exist" })

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(401).send({ 'message': 'Email or password is incorrect' })

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

const authorizationCheck = (req, res, next) => {
    if (req.user.id === req.params.id || req.user.role === 'admin') next()
    else return res.status(403).send({ 'message': 'You are not allowed to do that' })
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

module.exports = { loginMiddleware, verifyToken, checkRoleAdmin, checkRoleManager, checkRoleEmployee, authorizationCheck }