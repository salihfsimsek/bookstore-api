const router = require('express').Router()

//////Controllers//////
const { createCategory, deleteCategory, updateCategory, getCategory, getAllCategories } = require('../controllers/category-controller')

//////Middlewares//////
const { verifyToken, checkRoleManager } = require('../middlewares/auth-middleware')
const validate = require('../middlewares/validate-middleware')

//Validators
const { categoryValidation } = require('../validations/category-validation')

//////ROUTES//////

//Create category
router.post('/', verifyToken, checkRoleManager, validate(categoryValidation), createCategory)

//Delete Category
router.delete('/:id', verifyToken, checkRoleManager, deleteCategory)

router.put('/:id', verifyToken, checkRoleManager, validate(categoryValidation), updateCategory)

//Get category
router.get('/:id', getCategory)

//Get all categories
router.get('/', getAllCategories)

module.exports = router