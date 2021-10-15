const router = require('express').Router()

//////Controllers//////
const { register, login } = require('../controllers/auth-controller')

const { loginValidation } = require('../middlewares/auth-middleware')

//////Routes//////
router.post('/register', register)

router.post('/login', loginValidation, login)

module.exports = router