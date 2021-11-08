const UserService = require('../services/user-service')
const bcrypt = require('bcryptjs');

//Helpers
const { passwordToHash } = require('../scripts/utils/passwordHelper')

const updateUser = async (req, res) => {
    try {
        if (req.body.role && req.user.role !== 'admin') {
            return res.status(403).send({ 'message': 'You are not allowed to do that' })
        }

        if (req.body.password) {
            req.body.password = await passwordToHash(req.body.password)
        }

        const updatedUser = await UserService.update({ _id: req.params.id }, req.body)
        res.status(200).send(updatedUser)
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        await UserService.delete(userId)
        res.status(200).send({ 'message': 'User deleted successfully' })
    } catch (err) {
        res.status(400).send(err)
    }
}

const changeUsersRole = async (req, res) => {
    try {
        const updatedUser = await UserService.update({ _id: req.params.id }, { role: req.body.role })
        res.status(200).send(updatedUser)
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports = { updateUser, deleteUser, changeUsersRole }