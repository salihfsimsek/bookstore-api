const mongoose = require('mongoose')

const AddressSchema = mongoose.Schema({
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true
    },
    addressLine: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const AddressModel = mongoose.model('Address', AddressSchema)

module.exports = AddressModel