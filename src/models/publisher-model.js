const mongoose = require('mongoose')

const PublisherSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    books: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Book'
    }]
}, { timestamps: true })

const PublisherModel = mongoose.model('Publisher', PublisherSchema)

module.exports = PublisherModel