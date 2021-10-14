const router = require('express').Router()

//////Controllers//////
const { register } = require('../controllers/auth-controller')

router.post('/register', register)

router.post('/login', async (req, res) => {
    res.send('Login')
})

module.exports = router