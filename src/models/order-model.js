const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    items: [{
        book: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Book',
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    amount: {
        type: Number
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ["Draft", "Pending", "Completed", "Canceled", "Shipped"],
        default: 'Draft'
    }
}, { timestamps: true })

const OrderModel = mongoose.model('Order', OrderSchema)

module.exports = OrderModel