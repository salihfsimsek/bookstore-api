const router = require('express').Router()

//////Controllers//////
const { createOrder, deleteOrder, updateOrder, getOrder, getUsersAllOrders, getAllOrders, updateOrderStatus } = require('../controllers/order-controller')

//////Middlewares//////
const { verifyToken, authorizationCheck, checkRoleManager, checkRoleEmployee } = require('../middlewares/auth-middleware')

//////ROUTES//////
router.post('/', verifyToken, createOrder)

router.put('/:id', verifyToken, authorizationCheck, updateOrder)

router.delete('/:id', verifyToken, authorizationCheck, deleteOrder)

router.get('/:id', verifyToken, authorizationCheck, getOrder)

//Get user's all orders
router.get('/', verifyToken, getUsersAllOrders)

//Get all order option for admin and manager
router.get('/all-orders', verifyToken, checkRoleManager, getAllOrders)

//This endpoint will only be used to change the status of order. Admin, manager, employee
router.put('/:id/update-status', verifyToken, checkRoleEmployee, updateOrderStatus)
module.exports = router