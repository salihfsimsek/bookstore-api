const router = require('express').Router();

//////Controllers//////
const { createAddress, deleteAddress, updateAddress, getAddress, getAllAddresses, getAllAddressesForManager } = require('../controllers/address-controller')

//////Middlewares//////
const { verifyToken, authorizationCheck, checkRoleManager } = require('../middlewares/auth-middleware')
const validate = require('../middlewares/validate-middleware')

//////Validator//////
const { addressValidation } = require('../validations/address-validation');

//////ROUTES//////

//Create
router.post('/', verifyToken, validate(addressValidation), createAddress)

//Get all for admin and manager
router.get('/all', verifyToken, checkRoleManager, getAllAddressesForManager)

//Get addresses for client
router.get('/', verifyToken, getAllAddresses)

//Delete
router.delete('/:id', verifyToken, authorizationCheck, deleteAddress)

//Update
router.put('/:id', verifyToken, validate(addressValidation), updateAddress)

//Get address
router.get('/:id', verifyToken, getAddress)




module.exports = router