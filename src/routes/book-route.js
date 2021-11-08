const router = require('express').Router()

//////Middlewares//////
const { verifyToken, checkRoleEmployee } = require('../middlewares/auth-middleware')
const validate = require('../middlewares/validate-middleware')
//////Controllers//////
const { createBook, deleteBook, updateBook, getBook, getAllBooks } = require('../controllers/book-controller')

//Const validators
const { bookValidation } = require('../validations/book-validation')

//File helper
const { upload } = require('../scripts/utils/imageHelper')

//////ROUTES//////

//Create
router.post('/', verifyToken, checkRoleEmployee, upload.array('images', 5), validate(bookValidation), createBook)

//Delete
router.delete('/:id', verifyToken, checkRoleEmployee, deleteBook)

//Update
router.put('/:id', verifyToken, checkRoleEmployee, validate(bookValidation), updateBook)

//Get book
router.get('/:id', getBook)

//Get all books
router.get('/', getAllBooks)

module.exports = router