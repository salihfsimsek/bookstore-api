const BaseService = require('./base-service')
const OrderModel = require('..//models/order-model')

class OrderService extends BaseService {
    model = OrderModel

    async calculateDailyIncome(prev) {
        return OrderModel.aggregate([
            { $match: { createdAt: { $gte: prev } } },
            {
                $project: {
                    timeStamp: { $toDate: '$createdAt' },
                    day: { $dayOfMonth: '$createdAt' },
                    sales: '$amount'
                },
            },
            {
                $group: {
                    _id: {
                        '$dateToString': { format: '%d-%m-%Y', date: '$timeStamp' }
                    },
                    total: { $sum: '$sales' },
                },
            },
        ])
    }
}

module.exports = new OrderService()