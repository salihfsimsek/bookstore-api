const router = require('express').Router()

//////Controllers//////
const { createAuthor, deleteAuthor, updateAuthor, getAuthor, getAllAuthors } = require('../controllers/author-controller')

const { verifyToken, checkRoleManager } = require('../middlewares/auth-middleware')

//Create
router.post('/', verifyToken, checkRoleManager, createAuthor)

//Delete
router.delete('/:id', verifyToken, checkRoleManager, deleteAuthor)

//Update
router.delete('/:id', verifyToken, checkRoleManager, updateAuthor)

//Get author
router.get('/:id', getAuthor)

//Get all authors
router.get('/', getAllAuthors)