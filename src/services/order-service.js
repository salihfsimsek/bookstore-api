const BaseService = require('./base-service')
const OrderModel = require('..//models/order-model')

class OrderService extends BaseService {
    model = OrderModel
}

module.exports = new OrderService()