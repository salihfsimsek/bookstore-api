const router = require('express').Router()

//////Controllers//////
const { register, login } = require('../controllers/auth-controller')

//Middlewares
const { loginMiddleware } = require('../middlewares/auth-middleware')
const validate = require('../middlewares/validate-middleware')

//Validators
const { registerValidation, loginValidation } = require('../validations/auth-validation')

//////Routes//////
router.post('/register', validate(registerValidation), register)

router.post('/login', validate(loginValidation), loginMiddleware, login)

module.exports = router