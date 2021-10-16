const router = require('express').Router()

//////Middlewares//////
const { authorizationCheck, verifyToken, checkRoleAdmin } = require('../middlewares/auth-middleware')

//////Controllers//////
const { updateUser, deleteUser, changeUsersRole } = require('../controllers/user-controller')

router.put('/:id', verifyToken, authorizationCheck, updateUser)

router.delete('/:id', verifyToken, authorizationCheck, deleteUser)

//Update user role
router.put('/:id/update-role', verifyToken, checkRoleAdmin, changeUsersRole)

module.exports = router