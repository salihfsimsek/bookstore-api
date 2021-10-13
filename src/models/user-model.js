const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    lastSeen: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    orders: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Order'
    }]
})

const UserModel = mongoose.Model('User', UserSchema)

module.exports = UserModel