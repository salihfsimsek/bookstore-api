const router = require('express').Router()

//////Middlewares//////
const { createComment, deleteComment, updateComment } = require('../controllers/comment-controller')

//////Controllers//////
const { verifyToken } = require('../middlewares/auth-middleware')
const validate = require('../middlewares/validate-middleware')

//Validators
const { commentValidation } = require('../validations/comment-validation')

//////ROUTES//////

//Create
router.post('/', verifyToken, validate(commentValidation), createComment)

//Delete
router.delete('/:id', verifyToken, deleteComment)

//Update
router.put('/:id', verifyToken, validate(commentValidation), updateComment)

module.exports = router