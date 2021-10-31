const router = require('express').Router();

//////Controllers//////
const { createAddress, deleteAddress, updateAddress, getAddress, getAllAddress } = require('../controllers/address-controller')

//////Middlewares//////
const { verifyToken, authorizationCheck } = require('../middlewares/auth-middleware')
const validate = require('../middlewares/validate-middleware')

//////Validator//////
const { addressValidation } = require('../validations/address-validation');

//////ROUTES//////

//Create
router.post('/', verifyToken, validate(addressValidation), createAddress)

//Delete
router.delete('/:id', verifyToken, authorizationCheck, deleteAddress)

//Update
router.put('/:id', verifyToken, validate(addressValidation), updateAddress)

//Get address
router.get('/:id', verifyToken, getAddress)

//Get all
router.get('/', verifyToken, getAllAddress)

module.exports = router