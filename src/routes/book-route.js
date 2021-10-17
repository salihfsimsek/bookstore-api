const router = require('express').Router()

//////Middlewares//////
const { verifyToken, checkRoleEmployee } = require('../middlewares/auth-middleware')

//////Controllers//////
const { createBook, deleteBook, updateBook, getBook, getAllBooks } = require('../controllers/book-controller')
const { route } = require('./auth-route')

//Create
router.post('/', verifyToken, checkRoleEmployee, createBook)

//Delete
router.delete('/:id', verifyToken, checkRoleEmployee, deleteBook)

//Update
router.put('/:id', verifyToken, checkRoleEmployee, updateBook)

//Get book
router.get('/:id', getBook)

//Get all books
router.get('/', getAllBooks)

module.exports = router