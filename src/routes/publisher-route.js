const router = require('express').Router()

//////Controllers//////
const { createPublisher, deletePublisher, getPublisher, getAllPublishers } = require('../controllers/publisher-controller')

const { verifyToken, checkRoleManager } = require('../middlewares/auth-middleware')

//Create
router.post('/', verifyToken, checkRoleManager, createPublisher)

//Delete
router.delete('/:id', verifyToken, checkRoleManager, deletePublisher)

//Update
router.put('/:id', verifyToken, checkRoleManager, updatePublisher)

//Get publisher
router.get('/:id', getPublisher)

//Get all publishers
router.get('/', getAllPublishers)

module.exports = router