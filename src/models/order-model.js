const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    items: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Book',
        quantity: {
            type: Number,
            default: 1
        }
    }],
    amount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const OrderModel = mongoose.model('Order', OrderSchema)

module.exports = OrderModel