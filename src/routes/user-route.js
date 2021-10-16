const router = require('express').Router()

//////Middlewares//////
const { authorizationCheck, verifyToken } = require('../middlewares/auth-middleware')

//////Controllers//////
const { updateUser, deleteUser } = require('../controllers/user-controller')

router.put('/:id', verifyToken, authorizationCheck, updateUser)

router.delete('/:id', verifyToken, authorizationCheck, deleteUser)

module.exports = router