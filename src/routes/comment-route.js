const router = require('express').Router()

//////Middlewares//////
const { createComment, deleteComment, updateComment } = require('../controllers/comment-controller')

//////Controllers//////
const { verifyToken } = require('../middlewares/auth-middleware')

//Create
router.post('/', verifyToken, createComment)

//Delete
router.delete('/:id', verifyToken, deleteComment)

//Update
router.put('/:id', verifyToken, updateComment)

module.exports = router