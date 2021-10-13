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
    phone: {
        type: String,
        required: true
    },
    orders: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Order'
    }],
    address: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Address'
    }],
    lastSeen: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

})

const UserModel = mongoose.Model('User', UserSchema)

module.exports = UserModel