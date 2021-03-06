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
            if (createdOrder.status === "Pending") {
                book.stock -= item.quantity
                await book.save()
            }
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

//////Statistical Datas For Admin//////

//Get monthly income
const lastThirtyDaysIncome = async (req, res) => {
    const prev = new Date(date.setMonth(date.getMonth() - 1))
    try {
        const data = await OrderService.calculateLast30Days(prev)
        res.status(httpStatus.OK).send(data)
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
    }
}

const lastSevenDaysIncome = async (req, res) => {
    const prevDay = new Date(date.setDate(date.getDate() - 7))
    try {
        const data = await OrderService.calculateLast7Days(prevDay)
        res.status(httpStatus.OK).send(data)
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
    }
}

const dailyIncome = async (req, res) => {
    try {
        const data = await OrderService.calculateToday(prev)
        res.status(httpStatus.OK).send(data)
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
    }
}

const statisticalOrderInfos = async (req, res) => {
    let statisticalDatas = {}

    //Last thiry days
    const date = new Date()
    const prev30Days = new Date(date.setMonth(date.getMonth() - 1))

    //Last seven days
    const date2 = new Date()
    const prev7Days = new Date(date2.setDate(date2.getDate() - 7))

    //Current date
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    try {
        const data1 = await OrderService.calculateDailyIncome(prev30Days)
        const data2 = await OrderService.calculateDailyIncome(prev7Days)
        const data3 = await OrderService.calculateDailyIncome(startOfToday)
        statisticalDatas = { lastThirtyDays: data1, lastSevenDays: data2, lastDay: data3 }
        res.status(httpStatus.OK).send(statisticalDatas)
    } catch (err) {
        console.log(err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
    }
}

module.exports = { createOrder, updateOrder, deleteOrder, getOrder, getUsersAllOrders, getAllOrders, updateOrderStatus, statisticalOrderInfos }