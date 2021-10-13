const mongoose = require('mongoose')

const PublisherSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    books: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Book'
    }]
})

const PublisherModel = mongoose.model('Publisher', PublisherSchema)

module.exports = PublisherModel