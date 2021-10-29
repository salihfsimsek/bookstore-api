const router = require('express').Router()

//////Controllers//////
const { createAuthor, deleteAuthor, updateAuthor, getAuthor, getAllAuthors } = require('../controllers/author-controller')

//Middlewares
const { verifyToken, checkRoleManager } = require('../middlewares/auth-middleware')
const validate = require('../middlewares/validate-middleware')

//Validator
const { authorValidation } = require('../validations/author-validation')

//////ROUTES//////

//Create
router.post('/', verifyToken, checkRoleManager, validate(authorValidation), createAuthor)

//Delete
router.delete('/:id', verifyToken, checkRoleManager, deleteAuthor)

//Update
router.put('/:id', verifyToken, checkRoleManager, validate(authorValidation), updateAuthor)

//Get author
router.get('/:id', getAuthor)

//Get all authors
router.get('/', getAllAuthors)

module.exports = router