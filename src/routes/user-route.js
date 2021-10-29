const router = require('express').Router()

//////Middlewares//////
const { authorizationCheck, verifyToken, checkRoleAdmin } = require('../middlewares/auth-middleware')
const validate = require('../middlewares/validate-middleware')

//////Controllers//////
const { updateUser, deleteUser, changeUsersRole } = require('../controllers/user-controller')

//Validators
const { userUpdateValidation, userRoleUpdateValidation } = require('../validations/user-validation')

router.put('/:id', verifyToken, authorizationCheck, validate(userUpdateValidation), updateUser)

router.delete('/:id', verifyToken, authorizationCheck, deleteUser)

//Update user role
router.put('/:id/update-role', verifyToken, checkRoleAdmin, validate(userRoleUpdateValidation), changeUsersRole)

module.exports = router