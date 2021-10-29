const router = require('express').Router()

//////Controllers//////
const { createPublisher, deletePublisher, updatePublisher, getPublisher, getAllPublishers } = require('../controllers/publisher-controller')

//Middlewares
const { verifyToken, checkRoleManager } = require('../middlewares/auth-middleware')
const validate = require('../middlewares/validate-middleware')

//Validators
const { publisherValidation } = require('../validations/publisher-validation')

//////ROUTES//////

//Create
router.post('/', verifyToken, checkRoleManager, validate(publisherValidation), createPublisher)

//Delete
router.delete('/:id', verifyToken, checkRoleManager, deletePublisher)

//Update
router.put('/:id', verifyToken, checkRoleManager, validate(publisherValidation), updatePublisher)

//Get publisher
router.get('/:id', getPublisher)

//Get all publishers
router.get('/', getAllPublishers)

module.exports = router