const BaseService = require('./base-service')
const OrderModel = require('..//models/order-model')

class OrderService extends BaseService {
    model = OrderModel

    async calculateDailyIncome(prev) {
        console.log(prev)
        return OrderModel.aggregate([
            { $match: { createdAt: { $gte: prev } } },
            {
                $project: {
                    day: { $dayOfMonth: '$createdAt' },
                    sales: '$amount'
                },
            },
            {
                $group: {
                    _id: '$day',
                    total: { $sum: '$sales' }
                },
            },
        ])
    }
}

module.exports = new OrderService()