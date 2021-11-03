const BaseService = require('./base-service')
const OrderModel = require('..//models/order-model')

class OrderService extends BaseService {
    model = OrderModel

    async calculateMonthlyIncome(last, prev) {
        return OrderModel.aggregate([
            { $match: { createdAt: { $gte: prev } } },
            {
                $project: {
                    month: { $month: '$createdAt' },
                    sales: '$amount'
                },
            },
            {
                $group: {
                    _id: '$month',
                    total: { $sum: '$sales' }
                },
            },
        ])
    }

    async calculateDailyIncome(last, prev) {
        return OrderModel.aggregate([
            { $match: { createdAt: { $gte: prev } } },
            {
                $project: {
                    date: { $dayOfMonth: '$createdAt' },
                    sales: '$amount'
                }
            },
            {
                $group: {
                    _id: '$date',
                    total: { $sum: '$sales' }
                }
            }
        ])
    }
}

module.exports = new OrderService()