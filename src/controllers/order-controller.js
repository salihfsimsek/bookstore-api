//External packages
const httpStatus = require('http-status');

const OrderService = require('../services/order-service')
const BookService = require('../services/book-service')
const createOrder = async (req, res) => {
    try {
        req.body.user = req.user.id
        req.body.amount = 0
        const createdOrder = await OrderService.create(req.body)
        res.status(httpStatus.OK).send(createdOrder)
    } catch (err) {
        res.status(httpStatus.BAD_REQUEST).send(err)
    }
}

const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await OrderService.update({ _id: req.params.id }, req.body)
        res.status(httpStatus.OK).send(updatedOrder)

    } catch (err) {
        res.status(httpStatus.BAD_REQUEST).send(err)
    }
}

const deleteOrder = async (req, res) => {
    try {
        await OrderService.delete({ _id: req.params.id })
        res.status(httpStatus.OK).send({ message: 'Order deleted successfully' })
    } catch (err) {
        res.status(httpStatus.BAD_REQUEST).send(err)
    }
}

const getOrder = async (req, res) => {
    try {
        const order = await OrderService.find({ id: req.params.id, user: req.user.id })
        res.status(httpStatus.OK).send(order)
    } catch (err) {
        res.status(httpStatus.BAD_REQUEST).send(err)
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderService.findAll()
        res.status(200).send(orders)
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports = { createOrder, updateOrder, deleteOrder, getOrder, getAllOrders }