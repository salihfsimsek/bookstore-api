const mongoose = require('mongoose')

const AuthorSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    books: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Book'
    }]
}, { timestamps: true })

const AuthorModel = mongoose.model('Author', AuthorSchema)

module.exports = AuthorModel