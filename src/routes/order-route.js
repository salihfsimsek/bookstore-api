const router = require('express').Router()

//////Controllers//////
const { createOrder, deleteOrder, updateOrder, getOrder, getAllOrders } = require('../controllers/order-controller')

//////Middlewares//////
const { verifyToken, authorizationCheck } = require('../middlewares/auth-middleware')

//////ROUTES//////
router.post('/', verifyToken, createOrder)

router.put('/:id', verifyToken, authorizationCheck, updateOrder)

router.delete('/:id', verifyToken, authorizationCheck, deleteOrder)

router.get('/:id', verifyToken, authorizationCheck, getOrder)

router.get('/', verifyToken, authorizationCheck, getAllOrders)