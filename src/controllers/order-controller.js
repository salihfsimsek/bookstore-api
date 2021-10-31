//External packages
const httpStatus = require('http-status');

const OrderService = require('../services/order-service')
const BookService = require('../services/book-service')

const createOrder = async (req, res) => {
    try {
        req.body.user = req.user.id
        let amount = 0
        const createdOrder = await OrderService.create(req.body)
        await Promise.all(createdOrder.items.map(async (item) => {
            const book = await BookService.find({ _id: item.book })
            console.log(book)
            amount += book.price * item.quantity
        }))
        createdOrder.amount = amount
        await createdOrder.save()
        res.status(httpStatus.OK).send(createdOrder)
    } catch (err) {
        console.log(err)
        res.status(httpStatus.BAD_REQUEST).send(err)
    }
}

const updateOrder = async (req, res) => {
    try {
        let amount = 0
        const updatedOrder = await OrderService.update({ _id: req.params.id }, req.body)
        await Promise.all(updatedOrder.items.map(async (item) => {
            const book = await BookService.find({ _id: item.book })
            console.log(book)
            amount += book.price * item.quantity
        }))
        updatedOrder.amount = amount
        await updatedOrder.save()
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
        const order = await OrderService.find({ id: req.params.id })
        res.status(httpStatus.OK).send(order)
    } catch (err) {
        res.status(httpStatus.BAD_REQUEST).send(err)
    }
}

//Show only user's orders
const getUsersAllOrders = async (req, res) => {
    try {
        const orders = await OrderService.find({ user: req.user.id })
        res.status(200).send(orders)
    } catch (err) {
        res.status(400).send(err)
    }
}

//Show all order to system. Admin and manager
const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderService.findAll()
        res.status(200).send(orders)
    } catch (err) {
        res.status(400).send(err)
    }
}

//This controller will only be used to change the status of order. Admin, manager, employee
const updateOrderStatus = async (req, res) => {
    try {
        const updatedOrder = await OrderService.update({ _id: req.params.id }, req.body)
        res.status(httpStatus.OK).send(updatedOrder)
    } catch (err) {
        res.status(httpStatus.BAD_REQUEST).send(err)
    }
}

module.exports = { createOrder, updateOrder, deleteOrder, getOrder, getUsersAllOrders, getAllOrders, updateOrderStatus }